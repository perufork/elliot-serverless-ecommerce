const getExchangeRate = async (baseCurrency, destCurrency) => {
	const baseUrl = process.env.ELLIOT_EXCHANGE_RATES_URL;
	const url = `${baseUrl}?base_currency=${baseCurrency}&dest_currency=${destCurrency}`;

	return fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	}).then(res => {
		return res.json();
	});
};

export default getExchangeRate;
