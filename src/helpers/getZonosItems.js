import getExchangeRate from "./getExchangeRate";
import getSkuPrice from "./getSkuPrice";
import UnitsOfDimension from "./constants/UnitsOfDimension";
import UnitsOfWeight from "./constants/UnitsOfWeight";

export const getZonosItems = async (cart, domainCurrency) => {
	let conversionRate = 1;
	if (domainCurrency.toLowerCase() !== "usd") {
		({ rate: conversionRate } = await getExchangeRate(domainCurrency, "usd"));
	}

	const items = cart.map(({ quantity, product, sku }, cartItemId) => {
		const {
			product_category_tag_1: category1 = "",
			product_category_tag_2: category2 = "",
			product_category_tag_3: category3 = ""
		} = product.metadata || {};

		const unitOfDimensions =
			product.unit_of_dimensions || sku.unit_of_dimensions;
		const dimensionalUnits =
			UnitsOfDimension.properties[unitOfDimensions].label;

		const unitOfWeight = product.unit_of_weight || sku.unit_of_weight;
		const weightUnits = UnitsOfWeight.properties[unitOfWeight].label;

		return {
			cartItemId,
			detailedDescription: `${product.name}, ${product.description}. ${category1}, ${category2}, ${category3}`,
			category: category1,
			productId: product.id,
			sku: sku.sku,
			unitPrice: (getSkuPrice(sku) / 100) * conversionRate,
			quantity,
			length: product.length || sku.length,
			width: product.width || sku.width,
			height: product.height || sku.height,
			dimensionalUnits,
			weight: product.weight || sku.weight,
			weightUnits
		};
	});

	return { items, conversionRate };
};
