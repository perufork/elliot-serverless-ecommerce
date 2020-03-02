import getCartTotal from "./getCartTotal";
import KeyWords from "./constants/KeyWords";
import ShippingPreference from "./constants/ShippingPreference";
import getCartTotalWithPromo from "./getCartTotalWithPromo";

const getVendors = ({
	cart,
	checkout,
	shippingOptions = [],
	selectedShippingOptionIndex,
	freeShipping,
	flatRateShipping,
	orderTax,
	duty,
	vendorShippingOptions
}) => {
	const vendorsTemp = [];
	if (cart.find(({ product: { vendor } }) => !vendor)) {
		const cartItemsForVendor = cart.filter(
			({ product: { vendor } }) => !vendor
		);

		const vendorCartPriceSumRaw = getCartTotal(cartItemsForVendor);

		vendorsTemp.push({
			id: KeyWords.properties[KeyWords.DEFAULT].label,
			base64ProfileId: checkout.domain.owner.profile.edges[0].node.id,
			name: checkout.shipFromLocation.name,
			address1: checkout.shipFromLocation.address1,
			address2: checkout.shipFromLocation.address2 || "",
			city: checkout.shipFromLocation.city,
			userId: checkout.domain.owner.id,
			state: checkout.shipFromLocation.state,
			zipCode: checkout.shipFromLocation.zipCode,
			country: checkout.shipFromLocation.country,
			phoneNumber: checkout.shipFromLocation.phoneNumber,
			stripeConnectUserId: checkout.domain.stripeConnectUserId,
			...(checkout.shippingPreference === ShippingPreference.STANDARD && {
				shippingRateToken:
					shippingOptions[0] &&
					selectedShippingOptionIndex > -1 &&
					shippingOptions[selectedShippingOptionIndex].token
			}),
			freeShipping,
			flatRateShipping,
			cartPriceSumRaw: vendorCartPriceSumRaw,
			cartPriceSumWithPromo: getCartTotalWithPromo(
				vendorCartPriceSumRaw,
				checkout.promotion
			),
			shippingInfo:
				shippingOptions[0] && shippingOptions[selectedShippingOptionIndex],
			tax: orderTax,
			duty
		});
	}

	cart.forEach(({ product: { vendor } }) => {
		const getVendorProfileNode = vendor => vendor.profile.edges[0].node;
		const iVendor = vendor && getVendorProfileNode(vendor);

		if (iVendor && !vendorsTemp.find(({ id }) => iVendor.id === id)) {
			const cartItemsForVendor = cart.filter(
				({ product: { vendor } }) =>
					vendor && getVendorProfileNode(vendor).id === iVendor.id
			);

			const {
				freeShipping: iFreeShipping,
				flatRate: iFlatRateShipping,
				shipping,
				tax,
				duty: iDuty
			} = vendorShippingOptions[iVendor.id] || {};

			const vendorCartPriceSumRaw = getCartTotal(cartItemsForVendor);

			vendorsTemp.unshift({
				...iVendor,
				base64ProfileId: iVendor.id,
				...(checkout.shippingPreference === ShippingPreference.STANDARD && {
					shippingRateToken: shipping && shipping[0].token
				}),
				freeShipping: iFreeShipping,
				flatRateShipping: iFlatRateShipping,
				cartPriceSumRaw: vendorCartPriceSumRaw,
				cartPriceSumWithPromo: getCartTotalWithPromo(
					vendorCartPriceSumRaw,
					checkout.promotion
				),
				shippingInfo: shipping && shipping[0],
				tax,
				duty: iDuty
			});
		}
	});

	return vendorsTemp;
};

export default getVendors;
