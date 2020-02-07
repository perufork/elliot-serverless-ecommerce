import Link from "next/link";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CardElement } from "react-stripe-elements";
import { Flex, Item } from "react-flex-ready";
// import axios from "axios";
import { Formik, Field, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import isEmpty from "helpers/isEmpty";
import getTotal from "helpers/getTotal";
import { useCart } from "providers/CartProvider";
import InputField from "components/common/InputField";
import Button from "components/common/Button";
import ErrorField from "components/common/ErrorField";
import BuyButton from "components/checkout/OrderCheckout/components/BuyButton";
import { FieldWrapper, CreditCardWrap } from "./styles";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CreditCardForm = ({ stripe }) => {
	const { locale } = useIntl();
	const {
		// updateOrderTaxAndShippingCost,
		// selectedShippingOptionIndex,
		// cart,
		// checkout,
		// shippingOptions,
		// orderTax,
		// vendorShippingOptions,
		// cartPriceSumWithPromo,
		// cartPriceSumRaw,
		// parcels,
		// freeShipping,
		// setSelectedShippingOptionIndex,
		// cartPriceSumWithPromoAndTax,
		// displayCurrency,
		// displayExchangeRate,
		// checkoutId,
		// onOrderSubmitted,
		// onOrderLoading,
		// duty,
		// vendors,
		// domainOwnerHasItemsInCart,
		// isFullyHosted,
		// flatRateShipping
		state
	} = useCart();

	const [cardError, setCardError] = useState(false);
	const [validCard, setCardValidity] = useState(false);
	const [cardOnBlurMessage, setCardOnBlurMessage] = useState("");

	const checkValidCard = ({ error, complete }) => {
		if (cardOnBlurMessage) {
			setCardOnBlurMessage("");
		}

		setCardError(error && error.message);

		if (!complete) {
			setCardOnBlurMessage("Required fields are missing");
		} else {
			setCardValidity(true);
		}
	};

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				phone: "",
				addressLine1: "",
				addressLine2: "",
				city: "",
				state: "",
				country: "",
				zipCode: ""
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string()
					.max(100, "Full Name should be less than 100 characters!")
					.required("Required"),
				email: Yup.string()
					.email("Invalid email")
					.required("Required"),
				phone: Yup.string()
					.matches(phoneRegExp, "Invalid phone number")
					.required("Required"),
				addressLine1: Yup.string().required("Required"),
				addressLine2: Yup.string(),
				city: Yup.string().required("Required"),
				state: Yup.string().required(),
				country: Yup.string().required("Required"),
				zipCode: Yup.string().required("Required")
			})}
			onSubmit={async values => {
				try {
					// Within the context of `Elements`, this call to createToken knows which Element to
					// tokenize, since there's only one in this group.
					const { token } = await stripe.createToken({ name: values.name });
					onOrderLoading();

					if (!token) {
						onOrderSubmitted(OrderStatus.FAILED);
						return;
					}

					console.log(token);

					// const {
					// 	name,
					// 	addressLine1: line1,
					// 	addressLine2: line2,
					// 	city,
					// 	state,
					// 	country,
					// 	zipCode: postalCode,
					// 	phone,
					// 	email
					// } = values;

					// const data = {
					// 	email,
					// 	line1,
					// 	line2,
					// 	city,
					// 	state,
					// 	country,
					// 	postalCode,
					// 	phone,
					// 	name: name.slice(0, 100)
					// };

					// const payload = getShippingPayload({
					// 	checkout,
					// 	cart,
					// 	data,
					// 	orderTax,
					// 	cartPriceSumWithPromoAndTax,
					// 	cartPriceSumWithPromo,
					// 	cartPriceSumRaw,
					// 	duty,
					// 	vendorShippingOptions,
					// 	selectedShippingOptionIndex,
					// 	shippingOptions,
					// 	parcels,
					// 	vendors,
					// 	mode,
					// 	token,
					// 	domainOwnerHasItemsInCart
					// });

					// const functionURL = process.env.ELLIOT_CREATE_ORDER_SHIPPING_FUNCTION_URL;
					// const res = await fetch(functionURL, {
					// 	method: 'post',
					// 	body: JSON.stringify(payload),
					// 	headers: { 'Content-Type': 'application/json' }
					// });

					// if (res.ok) {
					// 	onOrderSubmitted(OrderStatus.SUCCEEDED);
					// } else {
					// 	onOrderSubmitted(OrderStatus.FAILED);
					// }
				} catch (error) {
					onOrderSubmitted(OrderStatus.FAILED);
					console.error(error);
				}
			}}
			render={({
				dirty,
				errors,
				setFieldValue,
				values: { phone },
				setFieldTouched
			}) => {
				const canSubmit =
					dirty &&
					isEmpty(errors) &&
					validCard &&
					!cardError &&
					selectedShippingOptionIndex !== -1;

				return (
					<Form>
						<>
							{[
								"name",
								"email",
								"phone",
								"addressLine1",
								"addressLine2",
								"city",
								"state",
								"country",
								"zipCode"
							].map(field => (
								<FastField
									key={field}
									name={field}
									autoComplete="on"
									style={{ display: "none" }}
								/>
							))}
						</>
						<div>
							<h4>Enter Payment Details</h4>
							<Flex align="flex-start">
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>Email</label>
										<Field
											name="email"
											type="email"
											autoComplete="new-password"
											as={InputField}
											placeholder="dublin@elliot.store"
										/>
										<ErrorMessage component={ErrorField} name="email" />
									</FieldWrapper>
								</Item>
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>Phone</label>
										<Field
											country="us"
											name="phone"
											autoComplete="new-password"
											value={phone}
											component={PhoneInput}
											placeholder={3477150728}
											onBlur={() => setFieldTouched("phone")}
											onChange={value => setFieldValue("phone", value)}
											inputStyle={{
												width: "100%",
												lineHeight: 49,
												height: 49
											}}
										/>
										<ErrorMessage component={ErrorField} name="phone" />
									</FieldWrapper>
								</Item>
							</Flex>
							<FieldWrapper>
								<label>Full Name</label>
								<Field
									name="name"
									as={InputField}
									autoComplete="new-password"
									placeholder="Dublin Skywalker"
								/>
								<ErrorMessage component={ErrorField} name="name" />
							</FieldWrapper>
							<FieldWrapper>
								<label>Address</label>
								<Field
									as={InputField}
									name="addressLine1"
									autoComplete="new-password"
									placeholder="33 Irving Place"
								/>
								<ErrorMessage component={ErrorField} name="addressLine1" />
							</FieldWrapper>
							<FieldWrapper>
								<label>Address 2</label>
								<Field
									name="addressLine2"
									as={InputField}
									autoComplete="new-password"
									placeholder="Suite 101"
								/>
								<ErrorMessage component={ErrorField} name="addressLine2" />
							</FieldWrapper>
							<FieldWrapper>
								<label>City</label>
								<Field
									name="city"
									as={InputField}
									autoComplete="new-password"
									placeholder="New York"
								/>
								<ErrorMessage component={ErrorField} name="city" />
							</FieldWrapper>
							<FieldWrapper>
								<label>State</label>
								<Field
									name="state"
									as={InputField}
									autoComplete="new-password"
									placeholder="New York"
								/>
								<ErrorMessage component={ErrorField} name="state" />
							</FieldWrapper>
							<Flex align="flex-start">
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>Country</label>
										<Field
											name="country"
											autoComplete="new-password"
											as={InputField}
											placeholder="United State"
										/>
										<ErrorMessage component={ErrorField} name="country" />
									</FieldWrapper>
								</Item>
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>Postal code</label>
										<Field
											name="zipCode"
											as={InputField}
											type="number"
											autoComplete="new-password"
											placeholder={10003}
										/>
										<ErrorMessage component={ErrorField} name="zipCode" />
									</FieldWrapper>
								</Item>
							</Flex>
							<FieldWrapper>
								<label>
									Credit Card
									{cardError && (
										<span>
											&nbsp; - &nbsp;
											<span
												style={{
													color: "#e10007",
													fontSize: "small"
												}}
											>
												{cardError}
											</span>
										</span>
									)}
								</label>
								<CreditCardWrap>
									<div>
										<CardElement
											style={{
												base: {
													"::placeholder": {
														color: "#cfcfcf"
													},
													fontSize: "16px"
												}
											}}
											onChange={checkValidCard}
											onBlur={() => {
												if (!cardError && cardOnBlurMessage) {
													setCardError(cardOnBlurMessage);
												}
											}}
										/>
									</div>
								</CreditCardWrap>
							</FieldWrapper>
							<div>
								<BuyButton canSubmit={canSubmit} price={getTotal(state.data)} />
								<Link href="/[lang]/" as={`/${locale}/`}>
									<Button as="a" wide variant="secondary">
										<FormattedMessage id="button.go_back" />
									</Button>
								</Link>
							</div>
						</div>
					</Form>
				);
			}}
		/>
	);
};

export default CreditCardForm;
