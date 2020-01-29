import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import getTotal from "helpers/getTotal";
import { useCart, useDispatchCart } from "providers/CartProvider";
import Button from "components/common/Button";
import Container from "components/common/Container";
import Coupon from "components/cart/components/Coupon";
import { Wrapper, Actions, Flex } from "./styles";

const Checkout = () => {
	const { locale } = useIntl();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();

	return (
		<Wrapper as={Container}>
			<Actions>
				<Flex>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<Button as="a" wide marginBottom={2} variant="outlined">
							<FormattedMessage id="button.continue_shopping" />
						</Button>
					</Link>
					<Link href="/[lang]/cart" as={`/${locale}/cart`}>
						<Button as="a" wide marginBottom={2} variant="outlined">
							<FormattedMessage id="button.update_cart" />
						</Button>
					</Link>
				</Flex>
				<Coupon />
			</Actions>
			<div className="ps-block--checkout-total">
				<div className="ps-block__top">
					<h4>
						Subtotal{" "}
						<span>
							${state.data && state.data.length > 0 ? getTotal(state.data) : 0}
						</span>
					</h4>
					<div className="ps-block__shipping">
						<h5>Shipping</h5>
						<div className="ps-radio">
							<input
								className="form-control"
								type="radio"
								id="shipping-1"
								name="shipping"
							/>
							<label htmlFor="shipping-1">
								Free Shipping <span>+$00.00</span>
							</label>
						</div>
						<div className="ps-radio">
							<input
								className="form-control"
								type="radio"
								id="shipping-2"
								name="shipping"
							/>
							<label htmlFor="shipping-2">
								Flat Rate <span>+$10.00</span>
							</label>
						</div>
						<div className="ps-radio">
							<input
								className="form-control"
								type="radio"
								id="shipping-3"
								name="shipping"
							/>
							<label htmlFor="shipping-3">
								Local Delivery <span>+$20.00</span>
							</label>
						</div>
					</div>
					<div className="ps-block__caculate">
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
					</div>
					<div className="ps-block__total">
						<h3>
							Total{" "}
							<span>
								$
								{state.data && state.data.length > 0 ? getTotal(state.data) : 0}
							</span>
						</h3>
					</div>
				</div>
				<div className="ps-block__bottom">
					<a className="ps-btn ps-btn--black" href="#">
						Proceed to checkout
					</a>
				</div>
			</div>
		</Wrapper>
	);
};

export default Checkout;
