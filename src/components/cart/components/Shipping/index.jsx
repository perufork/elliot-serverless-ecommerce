import getTotal from "helpers/getTotal";
import { FormattedMessage } from "react-intl";
import Button from "components/common/Button";
import Link from "next/link";
import { Wrapper, SubTotal, Total, Flex, Shipping, Country } from "./styles";
import RadioButton from "components/common/RadioButton";

export default ({ state, locale }) => (
	<Wrapper>
		<SubTotal>
			<Flex as="h4">
				Subtotal{" "}
				<span>
					${state.data && state.data.length > 0 ? getTotal(state.data) : 0}
				</span>
			</Flex>
			<Shipping>
				<h5>Shipping</h5>
				<RadioButton>
					<label htmlFor="shipping-1">
						<input type="radio" id="shipping-1" value="free" name="shipping" />
						Free Shipping <span>+$00.00</span>
					</label>
				</RadioButton>
				<RadioButton>
					<label htmlFor="shipping-2">
						<input type="radio" id="shipping-2" value="flat" name="shipping" />
						Flat Rate <span>+$10.00</span>
					</label>
				</RadioButton>
				<RadioButton>
					<label htmlFor="shipping-3">
						<input type="radio" id="shipping-3" value="local" name="shipping" />
						Local Delivery <span>+$20.00</span>
					</label>
				</RadioButton>
			</Shipping>
			<Country>
				<h5>Calculate Shipping</h5>
				<div className="form-group">
					<select className="ps-select">
						<option value="1">Select Country</option>
						<option value="2">USA</option>
						<option value="3">French</option>
					</select>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						placeholder="Postcode / ZIP"
					/>
				</div>
				<button className="ps-btn ps-btn--gray">Update Total</button>
			</Country>
			<Total>
				<Flex as="h3">
					Total{" "}
					<span>
						${state.data && state.data.length > 0 ? getTotal(state.data) : 0}
					</span>
				</Flex>
			</Total>
		</SubTotal>
		<div>
			<Link href={`/[lang]/checkout`} as={`/${locale}/checkout`}>
				<Button variant="secondary" wide as="a">
					<FormattedMessage id="button.proceed_to_checkout" />
				</Button>
			</Link>
		</div>
	</Wrapper>
);
