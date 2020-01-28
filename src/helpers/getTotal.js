const getTotal = cart =>
	cart.reduce((a, b) => a + b.skus.edges[0].node.salePrice * b.quantity, 0);

export default getTotal;
