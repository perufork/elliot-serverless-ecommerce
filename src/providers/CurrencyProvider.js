import React, { useContext, createContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
	const [state, setState] = useState("$");

	return (
		<CurrencyContext.Provider value={{ state, setState }}>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = () => useContext(CurrencyContext);
