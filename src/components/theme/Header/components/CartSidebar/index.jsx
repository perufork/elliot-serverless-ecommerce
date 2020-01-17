import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { CancelIcon } from "components/common/Icons";
import Button from "components/common/Button";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { removeFromCart } from "components/cart/actions";
import getTotal from "helpers/getTotal";
import { Wrapper, CartItem, Thumbnail, Content, CartFooter } from "./styles";
import thumbnailImage from "assets/product/product.jpg";

const CartSidebar = ({ toggleSidebar }) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	return (
		<Wrapper>
			{state.data && state.data.length > 0 ? (
				<div>
					<div>
						{state.data.map(({ id, title, price, quantity }) => (
							<CartItem key={id}>
								<Thumbnail>
									<Link href={`/${locale}/`} as={`/${locale}/`}>
										<a onClick={toggleSidebar}>
											<img src={thumbnailImage} alt="title" />
										</a>
									</Link>
								</Thumbnail>
								<Content>
									<button
										type="button"
										onClick={() => removeFromCart({ dispatch, id })}
									>
										<CancelIcon width={16} height={16} color="#a5a5a5" />
									</button>
									<Link href={`/${locale}/`} as={`/${locale}/`}>
										<a onClick={toggleSidebar}>{title}</a>
									</Link>
									<p>Qty: {quantity}</p>
									<span>${price}</span>
								</Content>
							</CartItem>
						))}
					</div>
					<CartFooter>
						<h3>
							Sub Total: <strong>${getTotal(state.data)}</strong>
						</h3>
						<div>
							<Link href={`/${locale}/cart/`} as={`/${locale}/cart/`}>
								<Button
									as="a"
									wide
									marginBottom={2}
									variant="secondary"
									onClick={toggleSidebar}
								>
									<FormattedMessage id="button.view_cart" />
								</Button>
							</Link>
							<Link href={`/${locale}/`} as={`/${locale}/`}>
								<Button as="a" wide variant="primary" onClick={toggleSidebar}>
									<FormattedMessage id="button.checkout" />
								</Button>
							</Link>
						</div>
					</CartFooter>
				</div>
			) : (
				<h4>No items on Cart</h4>
			)}
		</Wrapper>
	);
};

export default CartSidebar;
