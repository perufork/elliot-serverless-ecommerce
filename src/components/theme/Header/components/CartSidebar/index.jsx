import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { CancelIcon } from "components/common/Icons";
import Button from "components/common/Button";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { removeFromCart } from "components/cart/actions";
import getTotal from "helpers/getTotal";
import { Wrapper, CartItem, Thumbnail, Content, CartFooter } from "./styles";

const CartSidebar = ({ toggleSidebar }) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	return (
		<Wrapper>
			{state.data && state.data.length > 0 ? (
				<div>
					<div>
						{state.data.map(({ id, name, images, skus, quantity }) => (
							<CartItem key={id}>
								<Thumbnail>
									<Link href="/[lang]/" as={`/${locale}/`}>
										<a onClick={toggleSidebar}>
											<img
												src={`${process.env.ELLIOT_BASE_IMAGE_URL}${images.edges[0].node.image}`}
												alt={name}
											/>
										</a>
									</Link>
								</Thumbnail>
								<Content>
									<button
										type="button"
										onClick={() => removeFromCart({ dispatch, id })}
									>
										<CancelIcon width={14} height={14} color="#a5a5a5" />
									</button>
									<Link href="/[lang]/" as={`/${locale}/`}>
										<a onClick={toggleSidebar}>{name}</a>
									</Link>
									<p>Qty: {quantity}</p>
									{skus.edges[0].node.salePrice && (
										<span>${skus.edges[0].node.salePrice / 100}</span>
									)}
								</Content>
							</CartItem>
						))}
					</div>
					<CartFooter>
						<h3>
							Sub Total: <strong>${getTotal(state.data)}</strong>
						</h3>
						<div>
							<Link href="/[lang]/cart" as={`/${locale}/cart`}>
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
							<Link href="/[lang]/" as={`/${locale}/`}>
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
