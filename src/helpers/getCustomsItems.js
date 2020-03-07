import getExchangeRate from "./getExchangeRate";
import getSkuPrice from "./getSkuPrice";
import UnitsOfDimension from "./constants/UnitsOfDimension";
import UnitsOfWeight from "./constants/UnitsOfWeight";

const getCustomsItems = async (cart, domainCurrency) => {
	let conversionRate = 1;
	if (domainCurrency.toLowerCase() !== "usd") {
		({ rate: conversionRate } = await getExchangeRate(domainCurrency, "usd"));
	}

	const items = cart.map(({ quantity, product, sku }, cartItemId) => {
		const metadata = product.metadata?.edges[0]?.node;
		const {
			productCategoryTag1: category1 = "",
			productCategoryTag2: category2 = "",
			productCategoryTag3: category3 = ""
		} = metadata || {};

		const unitOfDimensions = product.unitOfDimensions || sku.unitOfDimensions;
		const dimensionalUnits =
			UnitsOfDimension.properties[unitOfDimensions].label;

		const unitOfWeight = product.unitOfWeight || sku.unitOfWeight;
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

export default getCustomsItems;
