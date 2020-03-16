import Link from "next/link";
import { useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart } from "providers/CartProvider";
import getTotal from "helpers/getTotal";
import { Wrapper, Flex, Product, Item, Price, Card } from "./styles";
import useShippingInfo from "hooks/useShippingInfo";
import isEmpty from "helpers/isEmpty";
import formatMoney from "helpers/formatMoney";

export default () => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { locale } = useIntl();
	const shippingInfo = useShippingInfo();
	const { duty, tax, shippingCost, shippingTotal } = shippingInfo;

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
				<Flex border>
					<p>sub total</p>
					{state?.data?.length > 0 && (
						<Price>
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
						</Price>
					)}
				</Flex>
				<Item>
					<h3>Shipping & Taxes</h3>
					{isEmpty(shippingInfo) && (
						<span>Input an address to get shipping summary</span>
					)}
				</Item>
				{!isEmpty(shippingInfo) && (
					<>
						<Flex border>
							<p>shipping</p>
							<Price>
								{loading ? (
									"..."
								) : (
									<NumberFormat
										value={formatMoney({ sum: shippingCost, exchangeRate })}
										displayType={"text"}
										thousandSeparator={true}
										prefix={currency}
									/>
								)}
							</Price>
						</Flex>
						{parseInt(tax) > 0 && (
							<Flex border>
								<p>tax</p>
								<Price>
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
								</Price>
							</Flex>
						)}
						{parseInt(duty) > 0 && (
							<Flex border>
								<p>duty</p>
								<Price>
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
								</Price>
							</Flex>
						)}
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
									value={getTotal(state.data, exchangeRate) + shippingTotal}
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
