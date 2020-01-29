import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "components/common/InputField";
import ErrorField from "components/common/ErrorField";
import { Wrapper, CouponWrapper } from "./styles";

export default () => (
	<Formik
		initialValues={{
			coupon: ""
		}}
		validationSchema={Yup.object().shape({
			coupon: Yup.string().required()
		})}
		onSubmit={async ({ coupon }, { setSubmitting }) => {
			try {
				console.log(coupon);
				setSubmitting(false);
			} catch (err) {
				console.log(err);
				setSubmitting(false);
			}
		}}
		render={({ isSubmitting }) => (
			<Wrapper as={Form}>
				<label>Discount Code</label>
				<CouponWrapper>
					<Field
						as={InputField}
						name="coupon"
						type="text"
						placeholder="Enter your code"
					/>
					<button type="submit" disabled={isSubmitting}>
						Apply
					</button>
				</CouponWrapper>
				<ErrorMessage component={ErrorField} name="coupon" />
			</Wrapper>
		)}
	/>
);
