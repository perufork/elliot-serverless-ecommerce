import { useState, useEffect } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CreditCardForm from "components/checkout/OrderCheckout/components/CreditCardForm";

const PaymentForm = () => {
	const [stripe, setStripe] = useState(null);

	useEffect(() => {
		setStripe(window.Stripe(process.env.STRIPE_API_PUBLISHABLE_KEY_TEST));
	}, []);

	return (
		<StripeProvider stripe={stripe}>
			<Elements>
				<CreditCardForm />
			</Elements>
		</StripeProvider>
	);
};

export default PaymentForm;
