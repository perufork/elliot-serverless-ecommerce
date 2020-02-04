const getTotal = cart =>
	cart.reduce(
		(a, b) => a + (b.skus.edges[0].node.salePrice / 100) * b.quantity,
		0
	);

export default getTotal;
