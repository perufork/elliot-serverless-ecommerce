export const getSkuPrice = sku => {
	if (!sku) return 0;
	const basePrice = sku.base_price;
	const salePrice = sku.sale_price;

	return (salePrice || basePrice).toFixed(2);
};

export default getSkuPrice;
