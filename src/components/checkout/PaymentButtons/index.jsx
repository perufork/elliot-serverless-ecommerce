import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentButtonsRaw from "./PaymentButtonsWrapper";

const PaymentButtons = ({ addToCartPayload }) => {
	const apiKey = process.env.STRIPE_API_PUBLISHABLE_KEY_TEST;

	return (
		<StripeProvider apiKey={apiKey}>
			<Elements>
				<PaymentButtonsRaw addToCartPayload={addToCartPayload} />
			</Elements>
		</StripeProvider>
	);
};

export default PaymentButtons;
