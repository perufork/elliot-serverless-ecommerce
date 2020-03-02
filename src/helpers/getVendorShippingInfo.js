import getVendorCart from "./getVendorCart";
import getShippingAmount from "./getShippingAmount";
import { getZonosItems } from "./getZonosItems";
import FlatRateShippingOptions from "./constants/FlatRateShippingOptions";
import FreeShippingThresholdTarget from "./constants/FreeShippingThresholdTarget";
import addShippingSurchargeToTax from "./addShippingSurchargeToTax";

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
	const printifyCart = cart.filter(
		({ product: { printify_id } }) => printify_id
	);

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
			try {
				const payload = {
					shipping_preference: checkout.shippingPreference,
					amount: vendor.cartPriceSumWithPromo,
					source: vendorShippingInfo,
					destination,
					...(parcels && { parcels: parcels[vendor.id] })
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

				let duty = 0;
				let zonosTax = 0;

				if (internationalShipping) {
					const { items, conversionRate } = await getZonosItems(
						vendorCart[vendor.id],
						domainCurrency
					);
					const zonosPayload = {
						shipFromAddress: {
							name: checkout.shippingLocation.name,
							address1: checkout.shipFromLocation.address1,
							address2: checkout.shipFromLocation.address2,
							city: checkout.shipFromLocation.city,
							stateCode: checkout.shipFromLocation.state,
							countryCode: checkout.shipFromLocation.country,
							postalCode: checkout.shipFromLocation.zipCode
						},
						shipToAddress: {
							address1: destination.street1,
							city: destination.city,
							stateCode: destination.state,
							countryCode: destination.country,
							postalCode: destination.zip
						},
						items
					};

					let zonosRes = await fetch("/duty", {
						method: "post",
						body: JSON.stringify(zonosPayload),
						headers: {
							"Content-Type": "application/json"
						}
					});

					zonosRes = await zonosRes.json();

					if (zonosRes && zonosRes.shippingQuotes) {
						const {
							dutyTaxTotal,
							duty: zonosDuty
						} = zonosRes.shippingQuotes[0];
						duty = Math.round((zonosDuty / conversionRate) * 100);
						zonosTax = Math.round(
							((dutyTaxTotal - zonosDuty) / conversionRate) * 100
						);
					}
				}

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
					const type =
						!internationalShipping && domesticFlatRate
							? FlatRateShippingOptions.DOMESTIC
							: internationalShipping && internationalFlatRate
							? FlatRateShippingOptions.INTERNATIONAL
							: false;
					return {
						type,
						value:
							type &&
							(type === FlatRateShippingOptions.DOMESTIC
								? domesticFlatRate
								: internationalFlatRate)
					};
				})();

				let taxAmount = !internationalShipping
					? Math.round(resJson.data.tax.amount)
					: zonosTax;

				taxAmount = await addShippingSurchargeToTax({
					tax: taxAmount,
					currency: domainCurrency,
					isPrintifyProduct: !!printifyCart.length
				});

				resolve({
					flatRate: !!flatRate.type && flatRate,
					freeShipping:
						freeShippingThreshold && freeShippingThreshold <= cartPriceSumRaw,
					vendor: vendor.id,
					tax: taxAmount,
					duty,
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
