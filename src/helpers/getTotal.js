const getTotal = (cart, exchangeRate) =>
	cart.reduce(
		(a, b) => a + ((b.sku.salePrice * exchangeRate) / 100) * b.quantity,
		0
	);

export default getTotal;
