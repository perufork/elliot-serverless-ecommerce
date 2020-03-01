const getTotal = cart =>
	cart.reduce((a, b) => a + (b.sku.salePrice / 100) * b.quantity, 0);

export default getTotal;
