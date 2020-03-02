import getExchangeRate from "./getExchangeRate";

const getShippingAmount = async (
	shippingAmount,
	baseCurrency,
	destinationCurrency
) => {
	const updatedShippingAmount = parseInt(shippingAmount);

	// Convert shipping amount to destination currency value
	if (baseCurrency !== destinationCurrency) {
		const domainExchangeRateResponse = await getExchangeRate(
			baseCurrency,
			destinationCurrency
		);
		const domainExchangeRate = parseFloat(domainExchangeRateResponse.rate);
		const convertedShippingAmount = parseInt(
			parseInt(shippingAmount) * domainExchangeRate
		);
		return convertedShippingAmount;
	}
	return updatedShippingAmount;
};

export default getShippingAmount;
