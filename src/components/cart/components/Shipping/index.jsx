import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useCurrency } from "providers/CurrencyProvider";
import getTotal from "helpers/getTotal";
import countries from "helpers/countries";
import Button from "components/common/Button";
import RadioButton from "components/common/RadioButton";
import InputField from "components/common/InputField";
import {
	Wrapper,
	SubTotal,
	Total,
	Flex,
	Shipping,
	Country,
	FormField
} from "./styles";

export default ({ state, locale }) => {
	const { formatMessage } = useIntl();
	const { exchangeRate } = useCurrency();

	return (
		<Wrapper>
			<Formik
				initialValues={{
					total:
						state.data && state.data.length > 0
							? getTotal(state.data, exchangeRate)
							: 0,
					shipping: 0,
					country: "usa",
					zipCode: ""
				}}
				validationSchema={Yup.object().shape({
					country: Yup.string().required(
						formatMessage({ id: "validation.required" })
					),
					zipCode: Yup.string().required(
						formatMessage({ id: "validation.required" })
					)
				})}
				onSubmit={async ({ shipping }, { setFieldValue, setSubmitting }) => {
					try {
						setFieldValue(
							"total",
							getTotal(state.data, exchangeRate) + parseInt(shipping, 10)
						);
						setSubmitting(false);
					} catch (err) {
						setSubmitting(false);
					}
				}}
			>
				{({
					isSubmitting,
					setFieldTouched,
					setFieldValue,
					values: { total, shipping }
				}) => (
					<Form>
						<SubTotal>
							<Flex as="h4">
								<FormattedMessage id="shipping.subtotal" />{" "}
								<span>
									$
									{state.data && state.data.length > 0
										? getTotal(state.data, exchangeRate)
										: 0}
								</span>
							</Flex>
							<Shipping>
								<h5>
									<FormattedMessage id="shipping.title" />
								</h5>
								<RadioButton>
									<Field
										as="input"
										type="radio"
										id="shipping-1"
										value={0}
										name="shipping"
										checked={parseInt(shipping, 10) === 0}
									/>
									<label htmlFor="shipping-1">
										<FormattedMessage id="shipping.free" /> <span>+$00.00</span>
									</label>
								</RadioButton>
								<RadioButton>
									<Field
										type="radio"
										id="shipping-2"
										value={10}
										name="shipping"
										checked={parseInt(shipping, 10) === 10}
									/>
									<label htmlFor="shipping-2">
										<FormattedMessage id="shipping.flat_rate" />{" "}
										<span>+$10.00</span>
									</label>
								</RadioButton>
								<RadioButton>
									<Field
										type="radio"
										id="shipping-3"
										value={20}
										name="shipping"
										checked={parseInt(shipping, 10) === 20}
									/>
									<label htmlFor="shipping-3">
										<FormattedMessage id="shipping.local" />{" "}
										<span>+$20.00</span>
									</label>
								</RadioButton>
							</Shipping>
							<Country>
								<h5>
									<FormattedMessage id="shipping.calculate" />
								</h5>
								<FormField>
									<Field
										component={Select}
										onChange={value => setFieldValue("country", value.label)}
										onBlur={() => setFieldTouched("country", true)}
										name="country"
										options={countries}
									/>
									<ErrorMessage component="span" name="country" />
								</FormField>
								<FormField>
									<Field
										as={InputField}
										type="text"
										name="zipCode"
										placeholder="Postcode / ZIP"
									/>
									<ErrorMessage component="span" name="zipCode" />
								</FormField>
								<Button
									variant="flat"
									type="submit"
									disabled={isSubmitting}
									wide
								>
									<FormattedMessage id="button.update_total" />
								</Button>
							</Country>
							<Total>
								<Flex as="h3">
									<FormattedMessage id="shipping.total" /> <span>${total}</span>
								</Flex>
							</Total>
						</SubTotal>
						<div>
							<Link href={`/[lang]/checkout`} as={`/${locale}/checkout`}>
								<Button variant="ghost" wide as="a">
									<FormattedMessage id="button.proceed_to_checkout" />
								</Button>
							</Link>
						</div>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};
