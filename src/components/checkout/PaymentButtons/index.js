import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentButtonsRaw from "./PaymentButtonsWrapper";

const PaymentButtons = ({
	addToCart,
	selectedSku,
	activeProductQuantity,
	hideCreditCardCheckoutButton
}) => {
	const apiKey = process.env.STRIPE_API_PUBLISHABLE_KEY_TEST;

	return (
		<StripeProvider apiKey={apiKey}>
			<Elements>
				<PaymentButtonsRaw
					addToCart={addToCart}
					selectedSku={selectedSku}
					activeProductQuantity={activeProductQuantity}
					hideCreditCardCheckoutButton={hideCreditCardCheckoutButton}
				/>
			</Elements>
		</StripeProvider>
	);
};

export default PaymentButtons;
