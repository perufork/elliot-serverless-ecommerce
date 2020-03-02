export const getVendorCart = cart => {
	const vendorCart = {};
	cart.forEach(cartItem => {
		const {
			product: { vendor }
		} = cartItem;
		if (!vendor) {
			vendorCart.default = vendorCart.default
				? [...vendorCart.default, cartItem]
				: [cartItem];
		} else {
			const vendorProfileId = vendor.profile.edges[0].node.id;
			vendorCart[vendorProfileId] = vendorCart[vendorProfileId]
				? [...vendorCart[vendorProfileId], cartItem]
				: [cartItem];
		}
	});
	return vendorCart;
};

export default getVendorCart;
