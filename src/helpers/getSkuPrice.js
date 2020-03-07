export const getSkuPrice = sku => {
	if (!sku) return 0;
	const { basePrice } = sku;
	const { salePrice } = sku;

	return (salePrice || basePrice).toFixed(2);
};

export default getSkuPrice;
