import modes from "./constants/Modes";
import ShippingPreference from "./constants/ShippingPreference";
import allCartProductsDownloadable from "./allCartProductsDownloadable";
import KeyWords from "./constants/KeyWords";
import UnitsOfWeight from "./constants/UnitsOfWeight";
import UnitsOfDimension from "./constants/UnitsOfDimension";
import getVendorCart from "./getVendorCart";

export const getShippingPayload = ({
	checkout,
	cart,
	data,
	cartPriceSumWithPromo,
	vendorShippingOptions,
	domainOwnerShippingOption,
	vendors,
	mode,
	token,
	cartPriceSumRaw,
	parcels
}) => {
	const domainCurrency = checkout.domain.company.currency;

	const payload = {
		test: mode === modes.TEST,
		shippingPreference: checkout.shippingPreference,
		currency: domainCurrency,
		discount: cartPriceSumWithPromo - cartPriceSumRaw,
		base64CheckoutId: checkout.id,
		base64DomainId: checkout.domain.id,
		token: token.id,
		stripeConnectedAcctId: checkout.domain.stripeConnectUserId,
		shopper: {
			name: data.name,
			email: data.email,
			phone: data.phone.replace(/\s/g, "")
		},
		perVendorOrder: []
	};

	if (
		checkout.shippingPreference === ShippingPreference.STANDARD &&
		!allCartProductsDownloadable(cart)
	) {
		payload.shopper = {
			...payload.shopper,
			address1: data.shipToAddress || data.line1,
			address2: data.line2,
			city: data.shipToCity || data.city,
			state: data.shipToState || data.state,
			country: data.shipToCountry || data.country,
			zipCode: data.shipToZipCode || data.postalCode
		};
	}

	const domainOwnerShipping = [];

	if (domainOwnerShippingOption) {
		domainOwnerShipping.push({
			...domainOwnerShippingOption,
			...vendors.find(
				({ id }) => id === KeyWords.properties[KeyWords.DEFAULT].label
			)
		});
	}

	const vendorShipping = Object.entries(vendorShippingOptions).map(
		([key, value]) => {
			return {
				...value,
				...vendors.find(({ id }) => id === key),
				base64ProfileId: key
			};
		}
	);

	const allShippingOptions = vendorShipping.concat(domainOwnerShipping);
	const perVendorCart = getVendorCart(cart);

	const perVendorOrder = allShippingOptions.map(vendor => {
		const shippingInfo = {
			...(vendor.shippingInfo && {
				tax: vendor.tax,
				duty: vendor.duty,
				amount: vendor.shippingInfo.amount,
				shippingType: vendor.shippingInfo.type
			})
		};

		return {
			cart: perVendorCart[vendor.id].map(({ product, sku, quantity }) => ({
				stripeId: sku.stripeId,
				sku: sku.sku,
				price: sku.salePrice || sku.basePrice,
				quantity,
				name: product.name,
				shippingInsurance: product.insuranceAmount,
				weight: product.weight || sku.weight,
				unitOfWeight:
					UnitsOfWeight.properties[product.unitOfWeight || sku.unitOfWeight]
						.label,
				height: product.height || sku.height,
				length: product.lenght || sku.length,
				width: product.width || sku.width,
				unitOfDimensions:
					UnitsOfDimension.properties[
						product.unitOfDimensions || sku.unitOfDimensions
					].label
			})),
			parcels: parcels[vendor.id],
			flatRate: vendor.freeShipping ? 0 : parseFloat(vendor.flatRateShipping),
			shippingRateToken: vendor.shippingRateToken,
			domainCommission: vendor.domainCommission || 0,
			address1: vendor.address1,
			address2: vendor.address2,
			city: vendor.city,
			state: vendor.state,
			country: vendor.country,
			isDomainOwner:
				checkout.domain.owner.profile.edges[0].node.id ===
				vendor.base64ProfileId,
			zipCode: vendor.zipCode,
			...shippingInfo,
			name: vendor.name,
			email: vendor.email || checkout.shipFromLocation.email,
			phone: vendor.phoneNumber,
			base64ProfileId: vendor.base64ProfileId,
			stripeConnectedAcctId: vendor.stripeConnectUserId
		};
	});

	payload.perVendorOrder = perVendorOrder;

	return payload;
};

export default getShippingPayload;
