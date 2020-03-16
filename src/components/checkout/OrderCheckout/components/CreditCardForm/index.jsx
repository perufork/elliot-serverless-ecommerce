import Link from "next/link";
import { useState, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Flex, Item } from "react-flex-ready";
import Select from "react-select";
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
import Loader from "components/common/Loader";
import BuyButton from "components/checkout/OrderCheckout/components/BuyButton";
import LocationSearchInput from "components/checkout/OrderCheckout/components/LocationSearchInput";
import getShippingPayload from "helpers/getShippingPayload";
import { useCurrency } from "providers/CurrencyProvider";
import getShippingOptions from "helpers/getShippingOptions";
import getDisplayedShippingOptions from "helpers/getDisplayedShippingOptions";
import adjustShippingOptionsForChoices from "helpers/adjustShippingOptionsForChoices";
import { Wrapper, FieldWrapper, CreditCardWrap } from "./styles";

const CreditCardForm = ({ stripe, checkout }) => {
	const { locale } = useIntl();
	const {
		state,
		state: { data: cart }
	} = useCart();
	const {
		state: currency,
		exchangeRate,
		loading: loadingCurrency
	} = useCurrency();
	const [loadingShippingInfo, setLoadingShippingInfo] = useState(false);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [cardError, setCardError] = useState(false);
	const [paymentState, setPaymentState] = useState(null);
	const [validCard, setCardValidity] = useState(false);
	const [cardOnBlurMessage, setCardOnBlurMessage] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [
		selectedShippingOptionIndex,
		setSelectedShippingOptionIndex
	] = useState(0);
	const [
		lastAddressUsedToFetchShipping,
		setLastAddressUsedToFetchShipping
	] = useState({
		city: "",
		state: "",
		country: "",
		zipCode: ""
	});
	const [touchedErrors, setTouchedErrors] = useState({});

	const hasAddressErrors = errors => {
		return (
			Object.keys(errors).filter(
				key =>
					["addressLine1", "city", "state", "country", "zipCode"].indexOf(
						key
					) !== -1
			).length > 0
		);
	};

	const isAddressDirty = (fieldName, value) => {
		return (
			["city", "country", "state", "zipCode"].indexOf(fieldName) !== -1 &&
			value !== lastAddressUsedToFetchShipping[fieldName]
		);
	};

	const {
		shippingOptions: displayedShippingOptions,
		freeShipping
	} = useMemo(
		() => getDisplayedShippingOptions({ shippingOptions, checkout }),
		[JSON.stringify(shippingOptions)]
	);

	const handleAddressSelected = async (
		addressLine1,
		addressLine2,
		city,
		selectedState,
		selectedCountry,
		zipCode
	) => {
		setLoadingShippingInfo(true);
		const shippingDestination = {
			line1: addressLine1,
			line2: addressLine2,
			city,
			state: selectedState,
			country: selectedCountry,
			zip: zipCode
		};

		const shippingOptions = await getShippingOptions({
			shippingDestination,
			cart,
			checkout
		});

		setShippingOptions(shippingOptions);

		setLoadingShippingInfo(false);
		setLastAddressUsedToFetchShipping({
			city,
			state: selectedState,
			country: selectedCountry,
			zipCode
		});
	};

	const onFieldBlur = async (fieldName, values, dirty, errors) => {
		const updatedTouchedErrors = { ...touchedErrors };
		if (fieldName in errors) {
			updatedTouchedErrors[fieldName] = true;
		} else if (fieldName in touchedErrors) {
			delete updatedTouchedErrors[fieldName];
		}

		const shippingDestination = {
			line1: values.addressLine1,
			line2: values.addressLine2,
			city: values.city,
			state: values.state,
			country: values.country,
			zip: values.zipCode
		};

		setTouchedErrors(updatedTouchedErrors);
		if (dirty && !hasAddressErrors(errors)) {
			if (
				!displayedShippingOptions ||
				isAddressDirty(fieldName, values[fieldName])
			) {
				const shippingOptions = await getShippingOptions({
					shippingDestination,
					cart,
					checkout
				});

				setShippingOptions(shippingOptions);
			}
			const updatedLastAddressUsedToFetchShipping = {
				...lastAddressUsedToFetchShipping
			};
			updatedLastAddressUsedToFetchShipping[fieldName] = values[fieldName];
			setLastAddressUsedToFetchShipping(updatedLastAddressUsedToFetchShipping);
		}
	};

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

	const locationSearchInputComponent = ({ field, form, onBlur, value }) => {
		return (
			<LocationSearchInput
				field={field}
				form={form}
				fieldsToUpdate={["addressLine1", "city", "state", "country", "zipCode"]}
				placeholder="33 Irving Place"
				onBlur={onBlur}
				onSelect={handleAddressSelected}
				value={value}
			/>
		);
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
				phone: Yup.string(),
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
					setPaymentLoading(true);

					if (!token) {
						console.error("NO TOKEN");
						return;
					}

					// console.log(token);

					const {
						name,
						addressLine1: line1,
						addressLine2: line2,
						city,
						state,
						country,
						zipCode: postalCode,
						phone,
						email,
						shipToAddress,
						shipToCity,
						shipToCountry,
						shipToState,
						shipToZipCode
					} = values;

					const data = {
						email,
						line1,
						line2,
						city,
						state,
						country,
						postalCode,
						phone,
						name: name.slice(0, 100),
						shipToAddress,
						shipToCity,
						shipToCountry,
						shipToState,
						shipToZipCode
					};

					const payload = getShippingPayload({
						checkout,
						cart,
						data,
						token,
						shippingOptions: adjustShippingOptionsForChoices({
							displayedShippingOptions,
							shippingOptions,
							checkout,
							selectedShippingOptionIndex
						}),
						selectedShippingOptionIndex
					});

					// console.log(payload, null, 2);
					const functionURL =
						process.env.ELLIOT_CREATE_ORDER_SHIPPING_FUNCTION_URL;
					const res = await fetch(functionURL, {
						method: "post",
						body: JSON.stringify(payload),
						headers: { "Content-Type": "application/json" }
					});

					if (res.ok) {
						setPaymentState("PAYMENT SUCCESSFUL");
					} else {
						setPaymentState("PAYMENT FAILED");
					}
				} catch (error) {
					setPaymentState("PAYMENT FAILED");
					// console.error({ error });
				} finally {
					setPaymentLoading(false);
				}
			}}
			render={({ dirty, errors, setFieldValue, values, setFieldTouched }) => {
				const canSubmit =
					dirty &&
					isEmpty(errors) &&
					validCard &&
					!cardError &&
					displayedShippingOptions &&
					!paymentLoading;

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
						<Wrapper>
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
											value={values.phone}
											component={PhoneInput}
											placeholder={3477150728}
											onBlur={() => setFieldTouched("phone")}
											onChange={value => setFieldValue("phone", value)}
											buttonStyle={{
												background: "#fafafa",
												border: "2px solid #eaeaea",
												borderRadius: 0
											}}
											dropdownStyle={{ background: "#fff" }}
											inputStyle={{
												width: "100%",
												lineHeight: 49,
												fontSize: "12px",
												color: "#222",
												height: 50,
												border: "2px solid #eaeaea",
												borderRadius: "0"
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
									// as={InputField}
									name="addressLine1"
									component={locationSearchInputComponent}
									onBlur={() => {
										onFieldBlur("addressLine1", values, dirty, errors);
									}}
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
								<label>Shipping method</label>
								{loadingShippingInfo && <Loader />}
								{freeShipping ? (
									<Select
										options={{
											label: "Free Shipping",
											value: "free"
										}}
										defaultValue={{
											label: "Free Shipping",
											value: "free"
										}}
									/>
								) : displayedShippingOptions ? (
									<Select
										onChange={e => setSelectedShippingOptionIndex(e.value)}
										options={displayedShippingOptions.map(
											({ provider, type, days }) => {
												let label = `${provider} ${type}`;

												if (days) {
													label += ` - Arrives in ${shippingOptions[0].days} day(s)`;
												}
												return [
													{
														label,
														value: 0
													}
												];
											}
										)}
										defaultValue={{
											label: `${displayedShippingOptions[0].provider} ${
												displayedShippingOptions[0].type
											} ${displayedShippingOptions[0] &&
												displayedShippingOptions[0].days &&
												` - Arrives in ${displayedShippingOptions[0].days} day(s)`}`,
											value: 0
										}}
									/>
								) : (
									<Field
										component={InputField}
										placeholder={
											loadingShippingInfo ? "" : "Complete Shipping Information"
										}
										disabled
									/>
								)}
							</FieldWrapper>
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
								<BuyButton
									canSubmit={canSubmit}
									price={getTotal(state.data, exchangeRate)}
									currency={currency}
									paymentState={paymentState}
									loadingCurrency={loadingCurrency}
									paymentLoading={paymentLoading}
								/>
								<Link href="/[lang]/" as={`/${locale}/`}>
									<Button as="a" wide variant="secondary">
										<FormattedMessage id="button.go_back" />
									</Button>
								</Link>
							</div>
						</Wrapper>
					</Form>
				);
			}}
		/>
	);
};

export default injectStripe(CreditCardForm);
