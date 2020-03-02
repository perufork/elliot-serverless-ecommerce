import getExchangeRate from "./getExchangeRate";

export const addShippingSurchargeToTax = async ({
	tax,
	currency,
	isPrintifyProduct
}) => {
	// Convert shipping surcharge (75 USD cents) to destination currency value
	const usdExchangeRateResponse = await getExchangeRate("USD", currency);
	const usdExchangeRate = parseFloat(usdExchangeRateResponse.rate);

	const shippingSurcharge = isPrintifyProduct
		? parseInt(100 * usdExchangeRate)
		: parseInt(75 * usdExchangeRate);
	return shippingSurcharge + tax;
};

export default addShippingSurchargeToTax;
