import KeyWords from "./constants/KeyWords";

const getVendorShippingAndTaxOptions = shippingOptions =>
	shippingOptions
		.filter(
			({ vendor }) => vendor !== KeyWords.properties[KeyWords.DEFAULT].label
		)
		.reduce(
			(
				acc,
				{
					vendor,
					shippingOptions: iShippingOptions,
					flatRate,
					freeShipping,
					tax,
					duty
				}
			) => ({
				...acc,
				[vendor]: {
					shipping: iShippingOptions,
					flatRate,
					freeShipping,
					tax,
					duty
				}
			}),
			{}
		);

export default getVendorShippingAndTaxOptions;
