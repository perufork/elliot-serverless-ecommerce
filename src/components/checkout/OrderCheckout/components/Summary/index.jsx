import Link from "next/link";
import { useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart } from "providers/CartProvider";
import { Wrapper, Flex, Product, Item, Price, Card } from "./styles";
import useShippingInfo from "hooks/useShippingInfo";
import isEmpty from "helpers/isEmpty";
import formatMoney from "helpers/formatMoney";
import SummaryItem from "./SummaryItem";
import { useCheckout } from "providers/CheckoutProvider";
import usePromotionLabel from "hooks/usePromotionLabel";
import useOrderSummary from "hooks/useOrderSummary";

export default () => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { locale } = useIntl();
	const shippingInfo = useShippingInfo();
	const { promotion } = useCheckout();
	const cart = state.data || [];
	const { duty, tax, shippingCost, shippingTotal } = shippingInfo;
	const { orderTotal, subTotal, promotion: promotionSum } = useOrderSummary({
		shippingTotal,
		exchangeRate,
		cart,
		promotion
	});

	return (
		<Wrapper>
			<h2>Summary</h2>
			<Card>
				<Flex border>
					<p>product</p>
					<p>total</p>
				</Flex>
				{state?.data?.length > 0 &&
					state.data.map(
						({ product: { id, slug, name }, quantity, sku }, i) => (
							<Product key={id}>
								<Link
									href="/[lang]/product/[slug]"
									as={`/${locale}/product/${slug}`}
									key={i}
								>
									<a>
										<p>{name}</p>
										<span>x{quantity}</span>
									</a>
								</Link>
								{sku?.salePrice && (
									<Price>
										{loading ? (
											"..."
										) : (
											<NumberFormat
												value={
													((sku.salePrice * exchangeRate) / 100) * quantity
												}
												displayType={"text"}
												thousandSeparator={true}
												prefix={currency}
											/>
										)}
									</Price>
								)}
							</Product>
						)
					)}
				<SummaryItem display label="sub total" sum={subTotal} />
				<SummaryItem
					display={!!promotion}
					label={usePromotionLabel()}
					sum={promotionSum}
				/>
				<Item>
					<h3>Shipping & Taxes</h3>
					{isEmpty(shippingInfo) && (
						<span>Input an address to get shipping summary</span>
					)}
				</Item>
				{!isEmpty(shippingInfo) && (
					<>
						<SummaryItem
							display
							label="shipping"
							sum={formatMoney({ sum: shippingCost, exchangeRate })}
						/>
						<SummaryItem
							display={parseFloat(tax) > 0}
							label="tax"
							sum={formatMoney({ sum: tax, exchangeRate })}
						/>
						<SummaryItem
							display={parseFloat(duty) > 0}
							label="duty"
							sum={formatMoney({ sum: duty, exchangeRate })}
						/>
					</>
				)}
				<Flex>
					<h5>Total</h5>
					{state?.data?.length > 0 && (
						<Price>
							{loading ? (
								"..."
							) : (
								<NumberFormat
									value={orderTotal}
									displayType={"text"}
									thousandSeparator={true}
									prefix={currency}
								/>
							)}
						</Price>
					)}
				</Flex>
			</Card>
		</Wrapper>
	);
};
