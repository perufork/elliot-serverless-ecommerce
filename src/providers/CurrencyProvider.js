import React, { useContext, createContext, useState, useEffect } from "react";
import currencies from "helpers/currencies.json";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
	const [state, setState] = useState("$");
	const [loading, setLoading] = useState(true);
	const [exchangeRate, setRate] = useState(1);

	useEffect(() => {
		const fetchExchangeRate = async () => {
			const baseUrl = process.env.ELLIOT_EXCHANGE_RATES_URL;
			const url = `${baseUrl}?base_currency=USD&dest_currency=${
				currencies.find(({ symbol }) => symbol === state).value
			}`;

			const { data } = await axios.get(url);

			setRate(Number.parseFloat(data.rate).toFixed(2));
			setLoading(false);
		};

		fetchExchangeRate();
	}, [state]);

	return (
		<CurrencyContext.Provider
			value={{ state, setState, exchangeRate, loading }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = () => useContext(CurrencyContext);
