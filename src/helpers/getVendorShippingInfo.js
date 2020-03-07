import getVendorCart from "./getVendorCart";
import getShippingAmount from "./getShippingAmount";
import getCustomsItems from "./getCustomsItems";
import ShippingPreference from "./constants/ShippingPreference";
import ProductTypes from "./constants/ProductTypes";
import FlatRateShippingOptions from "./constants/FlatRateShippingOptions";
import FreeShippingThresholdTarget from "./constants/FreeShippingThresholdTarget";

export const getVendorShippingInfo = ({
	vendors,
	parcels,
	destination: destinationInput,
	checkout,
	cart,
	cartPriceSumRaw
}) => {
	let domesticFlatRate = 0;
	let internationalFlatRate = 0;

	const {
		domain: { flatRateShippingOption }
	} = checkout;

	if (flatRateShippingOption) {
		({
			domestic: domesticFlatRate,
			international: internationalFlatRate
		} = flatRateShippingOption);
	}

	const shippingOptionPromises = vendors.map(vendor => {
		const vendorCart = getVendorCart(cart);

		const vendorShippingInfo = {
			name: vendor.name,
			street1: vendor.address1,
			street2: vendor.address2 || "",
			city: vendor.city,
			state: vendor.state,
			country: vendor.country,
			zip: vendor.zipCode
		};

		const destination = destinationInput || vendorShippingInfo;

		return new Promise(async (resolve, reject) => {
			const domainCurrency = checkout.domain.company.currency;
			const isSelfCheckout =
				checkout.shipping_preference === ShippingPreference.IN_STORE;

			let conversionRate = 1;
			let customsInfo = [];

			const internationalShipping = isSelfCheckout
				? vendor.country !== "US"
				: vendor.country !== destination.country;

			if (internationalShipping) {
				({ items: customsInfo, conversionRate } = await getCustomsItems(
					vendorCart[vendor.id].filter(
						({ product: { type } }) => type !== ProductTypes.DOWNLOADABLE
					),
					domainCurrency
				));
			}

			try {
				const payload = {
					shipping_preference: checkout.shippingPreference,
					amount: vendor.cartPriceSumWithPromo,
					source: vendorShippingInfo,
					destination,
					...(parcels && { parcels: parcels[vendor.id] }),
					exchange_rate: conversionRate,
					customs_info: customsInfo
				};

				const url = process.env.ELLIOT_ORDER_DETAILS_URL;

				const res = await fetch(url, {
					method: "post",
					body: JSON.stringify(payload),
					headers: { "Content-Type": "application/json" }
				});

				const resJson = await res.json();

				let lowestRate;
				let nextDayRate;

				lowestRate = resJson.data.shipping.lowest_rate;
				nextDayRate = resJson.data.shipping.next_day_rate;

				lowestRate.amount = await getShippingAmount(
					lowestRate.amount,
					lowestRate.currency,
					domainCurrency
				);

				if (nextDayRate.amount) {
					// If next day rate exists
					nextDayRate.amount = await getShippingAmount(
						nextDayRate.amount,
						nextDayRate.currency,
						domainCurrency
					);
				}

				const internationalShipping = vendor.country !== destination.country;

				let freeShippingThreshold;
				let shippingOptions;
				let flatRate;

				freeShippingThreshold =
					checkout.domain.freeShippingThreshold &&
					(!internationalShipping ||
						checkout.domain.freeShippingThresholdTarget ===
							FreeShippingThresholdTarget.ALL)
						? Math.round(checkout.domain.freeShippingThreshold)
						: null;

				shippingOptions = [lowestRate];

				if (nextDayRate.amount && lowestRate.token !== nextDayRate.token) {
					shippingOptions.push(nextDayRate);
				}

				flatRate = (() => {
					const isDomestic = !internationalShipping && domesticFlatRate;
					const isInternational =
						internationalShipping && internationalFlatRate;

					let type = false;

					if (isDomestic) {
						type = FlatRateShippingOptions.DOMESTIC;
					}

					if (isInternational) {
						type = FlatRateShippingOptions.DOMESTIC;
					}

					return {
						type,
						value:
							type &&
							(type === FlatRateShippingOptions.DOMESTIC
								? domesticFlatRate
								: internationalFlatRate)
					};
				})();

				let taxAmount = Math.round(resJson.data.tax.amount);

				resolve({
					flatRate: !!flatRate.type && flatRate,
					freeShipping:
						freeShippingThreshold && freeShippingThreshold <= cartPriceSumRaw,
					vendor: vendor.id,
					tax: taxAmount,
					duty: Math.round(resJson.data.tax.amount),
					shippingOptions
				});
			} catch (error) {
				reject(error);
			}
		});
	});

	return Promise.all(shippingOptionPromises);
};

export default getVendorShippingInfo;
