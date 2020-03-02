import getVendorShippingInfo from "./getVendorShippingInfo";
import getVendorShippingAndTaxOptions from "./getVendorShippingAndTaxOptions";
import getDomainOwnerShippingOption from "./getDomainOwnerShippingOption";
import getTaxFromShippingOptions from "./getTaxFromShippingOptions";
import getDutyFromShippingOptions from "./getDutyFromShippingOptions";

const getOrderTaxAndShippingCost = async ({
	cartPriceSumRaw,
	shippingDestination,
	parcels,
	vendors,
	cart,
	checkout,
	setFreeShipping,
	setFlatRate,
	setVendorShippingOptions,
	setDomainOwnerShippingOption,
	setDuty,
	setOrderTax,
	setShippingOptions,
	setSelectedShippingOptionIndex
}) => {
	try {
		const allShippingOptions = await getVendorShippingInfo({
			cartPriceSumRaw,
			destination: {
				name: "",
				street1: shippingDestination.line1,
				street2: shippingDestination.line2,
				city: shippingDestination.city,
				state: shippingDestination.state,
				country: shippingDestination.country,
				zip: shippingDestination.postal_code
			},
			parcels,
			vendors,
			cart,
			checkout
		});

		const vendorShippingOptions = getVendorShippingAndTaxOptions(
			allShippingOptions
		);

		const domainOwnerShippingOption = getDomainOwnerShippingOption(
			allShippingOptions
		);

		let { shippingOptions = [] } = domainOwnerShippingOption || {};

		if (!domainOwnerShippingOption) {
			shippingOptions = [allShippingOptions[0].shippingOptions[0]];
		}

		const taxAmount = getTaxFromShippingOptions(allShippingOptions);
		const duty = getDutyFromShippingOptions(allShippingOptions);

		setFreeShipping(
			domainOwnerShippingOption
				? domainOwnerShippingOption.freeShipping
				: allShippingOptions[0].freeShipping
		);
		setFlatRate(
			domainOwnerShippingOption
				? domainOwnerShippingOption.flatRate
				: allShippingOptions[0].flatRate
		);
		setVendorShippingOptions(vendorShippingOptions);
		setDomainOwnerShippingOption(domainOwnerShippingOption);
		setDuty(duty);
		setOrderTax(taxAmount);
		setShippingOptions(shippingOptions);
		if (shippingOptions[0]) {
			setSelectedShippingOptionIndex(0);
		} else {
			setSelectedShippingOptionIndex(-1);
		}
	} catch (error) {
		console.error(error);
	}
};

export default getOrderTaxAndShippingCost;
