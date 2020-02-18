import Link from "next/link";
import { useIntl } from "react-intl";
import { useCart } from "providers/CartProvider";
import { Wrapper, Flex, Product, Item, Price, Card } from "./styles";
import getTotal from "helpers/getTotal";

export default () => {
	const { state } = useCart();
	const { locale } = useIntl();

	console.log(state);

	return (
		<Wrapper>
			<h2>Summary</h2>
			<Card>
				<Flex border>
					<p>product</p>
					<p>total</p>
				</Flex>
				{state.data &&
					state.data.length > 0 &&
					state.data.map(({ id, slug, name, skus, quantity }, i) => (
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
							<Price>${(skus.edges[0].node.salePrice / 100) * quantity}</Price>
						</Product>
					))}
				<Flex border>
					<p>sub total</p>
					{state.data && state.data.length > 0 && (
						<Price>${getTotal(state.data)}</Price>
					)}
				</Flex>
				<Item>
					<h3>Shipping & Taxes</h3>
					<span>Input an address to get shipping summary</span>
				</Item>
				<Flex>
					<h5>Total</h5>
					{state.data && state.data.length > 0 && (
						<Price>${getTotal(state.data)}</Price>
					)}
				</Flex>
			</Card>
		</Wrapper>
	);
};
