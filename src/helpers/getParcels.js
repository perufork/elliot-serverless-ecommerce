import flatMap from "array.prototype.flatmap";
import ProductTypes from "./constants/ProductTypes";
import convertSkuDimension from "./convertSkuDimension";
import createParcel from "./createParcel";
import convertSkuWeight from "./convertSkuWeight";
import getParcelsFromCheckoutPackage from "./getParcelsFromCheckoutPackage";

export const getParcels = (cart, checkoutShippingRules) => {
	console.log(cart, "cart");
	const productsHaveDimensions =
		!!cart[0] &&
		cart.every(
			({
				sku: { unitOfDimensions: skuUnitOfDimensions },
				product: { unitOfDimensions, type: productType }
			}) => {
				console.log(
					unitOfDimensions,
					"><<",
					skuUnitOfDimensions,
					"<>>",
					productType,
					"><>",
					ProductTypes.DOWNLOADABLE
				);
				return (
					!!(unitOfDimensions || skuUnitOfDimensions) ||
					productType === ProductTypes.DOWNLOADABLE
				);
			}
		);
	const useBinPacking =
		productsHaveDimensions && !!checkoutShippingRules.length > 0;

	if (useBinPacking) {
		const items = flatMap(
			cart,
			({
				product: {
					name,
					type: productType,
					length: productLength,
					width: productWidth,
					height: productHeight,
					weight: productWeight,
					unitOfDimensions: productUnitOfDimensions,
					unitOfWeight: productUnitOfWeight
				},
				sku: {
					length: skuLength,
					width: skuWidth,
					height: skuHeight,
					weight: skuWeight,
					unitOfDimensions: skuUnitOfDimensions,
					unitOfWeight: skuUnitOfWeight
				},
				quantity
			}) => {
				const length = skuLength || productLength;
				const width = skuWidth || productWidth;
				const height = skuHeight || productHeight;
				const unitOfDimensions = skuUnitOfDimensions || productUnitOfDimensions;
				const unitOfWeight = skuUnitOfWeight || productUnitOfWeight;
				const weight = skuWeight || productWeight;
				return productType !== ProductTypes.DOWNLOADABLE
					? Array.from(new Array(quantity), () => [
							name,
							...[length, width, height].map(val =>
								convertSkuDimension(unitOfDimensions, Number(val))
							),
							convertSkuWeight(unitOfWeight, Number(weight))
					  ])
					: [];
			}
		);

		try {
			const packDimensions = checkoutShippingRules.map(each => {
				const { unitOfDimensions, height, width, length } = each;

				return [
					"checkout",
					...[height, width, length].map(val =>
						convertSkuDimension(unitOfDimensions, Number(val))
					),
					100000
				];
			});

			return getParcelsFromCheckoutPackage({
				items,
				packDimensions
			});
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	return flatMap(
		cart,
		({ quantity, product: { shippingRules, unitOfWeight, weight } }) => {
			shippingRules.sort(
				(rule1, rule2) => rule2.max_quantity - rule1.max_quantity
			);
			const parcels = [];
			let currQuantity = quantity;

			if (shippingRules.length === 0) {
				currQuantity = 0;
			}

			while (currQuantity > 0) {
				for (let i = 0; i < shippingRules.length; i++) {
					const shippingRule = shippingRules[i];
					const { fixedPackageType } = shippingRule;
					const { customPackageType } = shippingRule;

					const max = shippingRule.max_quantity;

					if (currQuantity >= max) {
						currQuantity -= max;

						const parcel = createParcel(
							fixedPackageType,
							customPackageType,
							unitOfWeight,
							weight,
							max
						);

						parcels.push(parcel);
						break;
					}

					let min = max;

					if (i < shippingRules.length - 1) {
						min = shippingRules[i + 1].max_quantity;
					}

					if (currQuantity > min) {
						const parcel = createParcel(
							fixedPackageType,
							customPackageType,
							unitOfWeight,
							weight,
							currQuantity
						);
						parcels.push(parcel);
						currQuantity = 0;
						break;
					}
				}
			}
			return parcels;
		}
	);
};

export default getParcels;
