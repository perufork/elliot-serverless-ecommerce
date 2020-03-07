import flatMap from "array.prototype.flatmap";
import ProductTypes from "./constants/ProductTypes";
import convertSkuDimension from "./convertSkuDimension";
import convertSkuWeight from "./convertSkuWeight";
import getParcelsFromCheckoutPackage from "./getParcelsFromCheckoutPackage";

const getParcels = (cart, checkoutShippingRules) => {
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
};

export default getParcels;
