import getVendorCart from "./getVendorCart";
import getParcels from "./getParcels";

const getVendorParcels = ({ cart, checkout }) => {
	const vendorCart = getVendorCart(cart);
	const packageTypes = checkout.domain.customPackageTypes.edges.map(
		({ node }) => node
	);

	const vendorParcels = Object.entries(vendorCart).reduce(
		(acc, [vendorId, iCart]) => {
			return {
				...acc,
				[vendorId]: getParcels(iCart, packageTypes)
			};
		},
		{}
	);

	return vendorParcels;
};

export default getVendorParcels;
