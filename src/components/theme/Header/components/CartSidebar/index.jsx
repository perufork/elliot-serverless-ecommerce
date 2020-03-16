import Link from "next/link";
import dynamic from "next/dynamic";
import { FormattedMessage, useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { CancelIcon, EmptyCart } from "components/common/Icons";
import Button from "components/common/Button";
import { removeFromCart } from "components/cart/actions";
import getTotal from "helpers/getTotal";
import {
	Wrapper,
	CartItem,
	Thumbnail,
	Content,
	CartFooter,
	EmptyState
} from "./styles";
import formatMoney from "helpers/formatMoney";
import useShippingInfo from "hooks/useShippingInfo";
import isEmpty from "helpers/isEmpty";
const PaymentButtons = dynamic(
	() => import("components/checkout/PaymentButtons"),
	{
		ssr: false
	}
);

const CartSidebar = ({ toggleSidebar }) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	const shippingInfo = useShippingInfo();
	const { duty, tax, shippingCost, shippingTotal } = shippingInfo;

	return (
		<Wrapper>
			{state && state.data && state.data.length > 0 ? (
				<div>
					<div>
						{state.data.map(({ product: { name, images }, sku, quantity }) => (
							<CartItem key={sku.id}>
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
										onClick={() => removeFromCart({ dispatch, skuId: sku.id })}
									>
										<CancelIcon width={14} height={14} color="#a5a5a5" />
									</button>
									<Link href="/[lang]/" as={`/${locale}/`}>
										<a onClick={toggleSidebar}>{name}</a>
									</Link>
									<p>Qty: {quantity}</p>
									{sku?.salePrice && loading ? (
										"..."
									) : (
										<NumberFormat
											value={(sku.salePrice * exchangeRate) / 100}
											displayType={"text"}
											thousandSeparator={true}
											prefix={currency}
										/>
									)}
								</Content>
							</CartItem>
						))}
					</div>
					<CartFooter>
						<h3>
							Sub Total:{" "}
							<strong>
								{loading ? (
									"..."
								) : (
									<NumberFormat
										value={getTotal(state.data, exchangeRate)}
										displayType={"text"}
										thousandSeparator={true}
										prefix={currency}
									/>
								)}
							</strong>
						</h3>
						{!isEmpty(shippingInfo) && (
							<>
								{shippingCost > 0 && (
									<h3>
										Shipping:{" "}
										<strong>
											{loading ? (
												"..."
											) : (
												<NumberFormat
													value={formatMoney({
														sum: shippingCost,
														exchangeRate
													})}
													displayType={"text"}
													thousandSeparator={true}
													prefix={currency}
												/>
											)}
										</strong>
									</h3>
								)}
								{tax > 0 && (
									<h3>
										Tax:{" "}
										<strong>
											{loading ? (
												"..."
											) : (
												<NumberFormat
													value={formatMoney({ sum: tax, exchangeRate })}
													displayType={"text"}
													thousandSeparator={true}
													prefix={currency}
												/>
											)}
										</strong>
									</h3>
								)}
								{duty > 0 && (
									<h3>
										Duty:{" "}
										<strong>
											{loading ? (
												"..."
											) : (
												<NumberFormat
													value={formatMoney({ sum: duty, exchangeRate })}
													displayType={"text"}
													thousandSeparator={true}
													prefix={currency}
												/>
											)}
										</strong>
									</h3>
								)}

								<h3>
									Total:{" "}
									<strong>
										{loading ? (
											"..."
										) : (
											<NumberFormat
												value={
													getTotal(state.data, exchangeRate) + shippingTotal
												}
												displayType={"text"}
												thousandSeparator={true}
												prefix={currency}
											/>
										)}
									</strong>
								</h3>
							</>
						)}
						<div>
							<Link href="/[lang]/cart" as={`/${locale}/cart`}>
								<Button
									as="a"
									wide
									marginBottom={1}
									variant="secondary"
									onClick={toggleSidebar}
								>
									<FormattedMessage id="button.view_cart" />
								</Button>
							</Link>
							<Link href="/[lang]/checkout" as={`/${locale}/checkout`}>
								<Button
									as="a"
									wide
									variant="primary"
									onClick={toggleSidebar}
									marginBottom={1}
								>
									<FormattedMessage id="button.checkout" />
								</Button>
							</Link>
							<PaymentButtons />
						</div>
					</CartFooter>
				</div>
			) : (
				<EmptyState>
					<EmptyCart />
					<h4>Your cart is empty</h4>
				</EmptyState>
			)}
		</Wrapper>
	);
};

export default CartSidebar;
