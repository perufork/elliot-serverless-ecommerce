import React, { useMemo, useEffect } from "react";
import { injectStripe } from "react-stripe-elements";
import StripePaymentButton from "./WalletPayButtons";
import { useCheckout } from "providers/CheckoutProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart } from "providers/CartProvider";
import getRawCartPrice from "helpers/getRawCartPrice";
import getSkuTotal from "helpers/getSkuTotal";
import {
	getSelfCheckoutPaymentRequestInput,
	getShippingPaymentRequestInput
} from "helpers/getPaymentRequestInput";
import ShippingPreference from "helpers/constants/ShippingPreference";
import getWalletDisplayItems from "helpers/getWalletDisplayItems";

const PaymentButtonsWrapper = ({ stripe }) => {
	const checkout = useCheckout();
	const { state: displayCurrency } = useCurrency();
	const {
		state: { data: cart }
	} = useCart();

	const cartPriceSumRaw = getRawCartPrice(cart);

	const cartPriceSumWithPromo = getSkuTotal(
		cartPriceSumRaw,
		checkout.promotion
	);

	const paymentRequestInput = useMemo(
		() => getShippingPaymentRequestInput(checkout, cart),
		[]
	);
	const paymentRequest = useMemo(
		() => stripe.paymentRequest(paymentRequestInput),
		[]
	);
	// Update remaining details in case of in-store checkout
	useEffect(() => {
		(async () => {
			if (
				checkout.shippingPreference === ShippingPreference.IN_STORE &&
				cart[0]
			) {
				const updatedPaymentRequestInput = getSelfCheckoutPaymentRequestInput({
					checkout,
					skuPrice: cartPriceSumRaw,
					skuTotal: cartPriceSumWithPromo,
					cart,
					displayCurrency: displayCurrency.toUpperCase()
				});

				if (updatedPaymentRequestInput) {
					paymentRequest.update(updatedPaymentRequestInput);
				}
			}
		})();
	}, []);

	// We're splitting this for standard and in-store checkouts, Tax is gotten before the pay modal shows up for in-store
	useEffect(() => {
		if (
			checkout.shippingPreference === ShippingPreference.STANDARD &&
			cart[0]
		) {
			const displayItems = getWalletDisplayItems(cart);
			const currentPaymentRequestInput = {
				currency: checkout.domain.company.currency,
				total: {
					label: checkout.domain.company.name,
					amount: cartPriceSumWithPromo,
					pending: true
				},
				displayItems
			};
			if (currentPaymentRequestInput) {
				paymentRequest.update(currentPaymentRequestInput);
			}
		}
	}, [cartPriceSumWithPromo]);

	return (
		<>
			<div>
				<StripePaymentButton
					cart={cart}
					displayCurrency={displayCurrency}
					checkout={checkout}
					paymentRequest={paymentRequest}
					onOrderLoading={() => console.log("order loading")}
					onOrderSubmitted={status =>
						console.log("order submitted", { status })
					}
				/>
			</div>
		</>
	);
};

export default injectStripe(PaymentButtonsWrapper);
