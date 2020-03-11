import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart, useDispatchCart } from "providers/CartProvider";
import Container from "components/common/Container";
import Swatch from "components/common/Swatch";
import QuantityController from "components/common/QuantityController";
import { CancelIcon } from "components/common/Icons";
import BackToShop from "components/common/BackToShop";
import { removeFromCart } from "components/cart/actions";
import {
	TableWrapper,
	Table,
	Thead,
	Tbody,
	Product,
	Thumbnail,
	Content
} from "./styles";

const ShoppingCart = ({ handleQuantity, quantities }) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	const uniqueAttributes = array => [...new Set(array)];
	const uniqueKeys = array =>
		Object.keys(array.reduce((result, obj) => Object.assign(result, obj), {}));

	return (
		<Container>
			{state && state.data && state.data.length > 0 ? (
				<TableWrapper>
					<Table>
						<Thead>
							<tr>
								<th>
									<FormattedMessage id="cart.th.product" />
								</th>
								{uniqueKeys(
									uniqueAttributes(
										state.data.map(({ sku: { attributes } }) => attributes)
									)
								).map((value, i) => (
									<th key={i}>{value}</th>
								))}
								<th>
									<FormattedMessage id="cart.th.price" />
								</th>
								<th>
									<FormattedMessage id="cart.th.product" />
								</th>
								<th>
									<FormattedMessage id="cart.th.quantity" />
								</th>
								<th>
									<FormattedMessage id="cart.th.total" />
								</th>
								<th></th>
							</tr>
						</Thead>
						<Tbody>
							{state.data.map(
								({
									product: { id, images, name, slug, description },
									quantity,
									sku
								}) => {
									const quantityByProduct =
										quantities.length > 0 &&
										quantities.find(item => item.id === id);

									return (
										<tr key={sku.id}>
											<td>
												<Product>
													<Thumbnail>
														<Link
															href="/[lang]/product/[slug]"
															as={`/${locale}/product/${slug}`}
														>
															<a>
																<img
																	src={`${process.env.ELLIOT_BASE_IMAGE_URL}${images.edges[0].node.image}`}
																	alt={name}
																/>
															</a>
														</Link>
													</Thumbnail>
													<Content>
														<Link
															href="/[lang]/product/[slug]"
															as={`/${locale}/product/${slug}`}
														>
															<a>{name}</a>
														</Link>
														<div
															dangerouslySetInnerHTML={{ __html: description }}
														/>
													</Content>
												</Product>
											</td>
											{sku.attributes &&
												Object.entries(sku.attributes).map((value, i) => (
													<td key={i}>
														{value[0] === "Color" ? (
															<Swatch color={value[1]} />
														) : (
															value[1]
														)}
													</td>
												))}
											<td>
												{sku?.salePrice && (
													<NumberFormat
														value={(sku.salePrice * exchangeRate) / 100}
														displayType={"text"}
														thousandSeparator={true}
														prefix={currency}
													/>
												)}
											</td>
											<td>
												<QuantityController
													cart
													id={id}
													skuId={sku.id}
													quantity={
														quantityByProduct
															? quantityByProduct.quantity
															: quantity
													}
													setQuantity={handleQuantity}
												/>
											</td>
											<td>
												<p>
													{sku?.salePrice && (
														<strong>
															{loading ? (
																"...."
															) : (
																<NumberFormat
																	value={
																		((sku.salePrice * exchangeRate) / 100) *
																		quantity
																	}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={currency}
																/>
															)}
														</strong>
													)}
												</p>
											</td>
											<td>
												<button
													type="button"
													onClick={() =>
														removeFromCart({ dispatch, skuId: sku.id })
													}
												>
													<CancelIcon width={16} height={16} color="#a5a5a5" />
												</button>
											</td>
										</tr>
									);
								}
							)}
						</Tbody>
					</Table>
				</TableWrapper>
			) : (
				<BackToShop title="cart.empty_state" />
			)}
		</Container>
	);
};

export default ShoppingCart;
