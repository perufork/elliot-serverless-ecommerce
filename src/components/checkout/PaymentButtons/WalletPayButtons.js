import { detect } from "detect-browser";
import React from "react";
import WalletPayBuyButton from "./WalletPayButton";
import stripeOnToken from "./stripeOnToken";
import stripeOnShippingOptionChange from "./stripeOnShippingOptionChange";
import stripeOnShippingAddressChange from "./stripeOnShippingAddressChange";

const browser = detect();

class WalletPayButtons extends React.Component {
	constructor(props) {
		super(props);
		props.paymentRequest.on("token", ({ complete, token, ...data }) => {
			const {
				onOrderLoading,
				onOrderSubmitted,
				paymentRequest,
				cart,
				checkout
			} = this.props;
			const { shippingOptions } = this.state;
			stripeOnToken({
				onOrderSubmitted,
				paymentRequest,
				onOrderLoading,
				token,
				data,
				shippingOptions,
				complete,
				cart,
				checkout
			});
		});

		props.paymentRequest.canMakePayment().then(result => {
			const canMakePayment = !!result;
			this.setState({
				canMakePayment
			});
		});

		props.paymentRequest.on("shippingoptionchange", ev => {
			const { shippingOptions } = this.state;
			const { cart, checkout } = this.props;
			stripeOnShippingOptionChange({
				ev,
				shippingOptions,
				checkout,
				cart
			});
		});

		props.paymentRequest.on("shippingaddresschange", ev => {
			const { checkout, displayCurrency, cart } = this.props;
			stripeOnShippingAddressChange({
				ev,
				setShippingOptions: shippingOptions =>
					this.setState({ shippingOptions }),
				checkout,
				displayCurrency,
				cart
			});
		});

		this.state = {
			canMakePayment: false,
			orderTax: 0
		};
	}

	render() {
		if (this.state.canMakePayment && browser && browser.name === "chrome") {
			return (
				<figure>
					<WalletPayBuyButton
						className="google ps-btn ps-btn--black"
						paymentRequest={this.props.paymentRequest}
						orderTax={this.state.orderTax}
						setOrderTax={orderTax => this.setState({ orderTax })}
					>
						<span>Buy Now With</span>
						<span
							className="icon"
							style={{
								backgroundImage: `url(${process.env.ELLIOT_BASE_IMAGE_URL}checkout/google-pay-icon.svg)`
							}}
						></span>
					</WalletPayBuyButton>
				</figure>
			);
		}
		if (this.state.canMakePayment && browser && browser.name === "edge") {
			return (
				<figure>
					<WalletPayBuyButton
						className="google ps-btn ps-btn--black"
						paymentRequest={this.props.paymentRequest}
						orderTax={this.state.orderTax}
						setOrderTax={orderTax => this.setState({ orderTax })}
					>
						<span>Buy Now With</span>
						<span
							className="icon"
							style={{
								backgroundImage: `url(${process.env.ELLIOT_BASE_IMAGE_URL}checkout/microsoft-pay-icon.svg)`
							}}
						></span>
					</WalletPayBuyButton>
				</figure>
			);
		}
		if (
			this.state.canMakePayment &&
			browser &&
			(browser.name === "safari" ||
				browser.name === "ios" ||
				browser.name === "ios-webview" ||
				browser.name === "instagram" ||
				browser.name === "facebook")
		) {
			return (
				<figure>
					<WalletPayBuyButton
						className="apple ps-btn ps-btn--black"
						paymentRequest={this.props.paymentRequest}
						orderTax={this.state.orderTax}
						setOrderTax={orderTax => this.setState({ orderTax })}
					>
						<span>Buy Now With</span>
						<span
							className="icon"
							style={{
								backgroundImage: `url(${process.env.ELLIOT_BASE_IMAGE_URL}checkout/apple-pay-icon.svg)`
							}}
						></span>
					</WalletPayBuyButton>
				</figure>
			);
		}
		return null;
	}
}

export default WalletPayButtons;
