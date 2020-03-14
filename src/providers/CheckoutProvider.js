import React, { useContext, createContext } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children, checkout }) => {
	return (
		<CheckoutContext.Provider value={checkout}>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckout = () => useContext(CheckoutContext);
