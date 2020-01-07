import { Wrapper } from "./styles";

const Checkout = () => (
	<div className="ps-section__content">
		<div className="ps-section__actions">
			<figure>
				<a className="ps-btn ps-btn--outline" href="checkout.html">
					Continue shopping
				</a>
				<a className="ps-btn ps-btn--outline" href="checkout.html">
					Update Cart
				</a>
			</figure>
			<div className="form-group">
				<label>Discount Code</label>
				<div className="form-group__content">
					<input
						className="form-control"
						type="text"
						placeholder="Enter your code"
					/>
					<a href="#">Apply</a>
				</div>
			</div>
		</div>
		<div className="ps-block--checkout-total">
			<div className="ps-block__top">
				<h4>
					Subtotal <span>$199.70</span>
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
						Total<span>$199.70</span>
					</h3>
				</div>
			</div>
			<div className="ps-block__bottom">
				<a className="ps-btn ps-btn--black" href="#">
					Proceed to checkout
				</a>
			</div>
		</div>
	</div>
);

export default Checkout;
