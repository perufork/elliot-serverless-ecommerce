import ProductTypes from "./constants/ProductTypes";

const allCartProductsDownloadable = cart => {
	return cart.every(
		({ product: { type: productType } }) =>
			productType === ProductTypes.DOWNLOADABLE
	);
};

export default allCartProductsDownloadable;
