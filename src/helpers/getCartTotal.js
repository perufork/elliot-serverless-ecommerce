const getCartTotal = cart =>
	cart.reduce(
		(acc, { sku: { salePrice, basePrice }, quantity: iQuantity }) =>
			acc + (salePrice || basePrice) * iQuantity,
		0
	);

export default getCartTotal;
