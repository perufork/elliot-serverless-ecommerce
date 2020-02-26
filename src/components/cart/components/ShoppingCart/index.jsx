import Link from "next/link";
import { useIntl } from "react-intl";
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
	const { state: currency } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	return (
		<Container>
			{state.data && state.data.length > 0 ? (
				<TableWrapper>
					<Table>
						<Thead>
							<tr>
								<th>Product</th>
								<th>Color</th>
								<th>Size</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
								<th></th>
							</tr>
						</Thead>
						<Tbody>
							{state.data.map(
								({ id, images, name, slug, skus, description, quantity }) => {
									const quantityByProduct =
										quantities.length > 0 &&
										quantities.find(item => item.id === id);

									return (
										<tr key={id}>
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
											<td>
												<Swatch color="#70849d" />
											</td>
											<td>M</td>
											<td>
												{skus?.edges[0]?.node?.salePrice && (
													<NumberFormat
														value={skus.edges[0].node.salePrice / 100}
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
													quantity={
														quantityByProduct ? quantityByProduct.quantity : 1
													}
													setQuantity={handleQuantity}
												/>
											</td>
											<td>
												<p>
													{skus?.edges[0]?.node?.salePrice && (
														<strong>
															<NumberFormat
																value={
																	(skus.edges[0].node.salePrice / 100) *
																	quantity
																}
																displayType={"text"}
																thousandSeparator={true}
																prefix={currency}
															/>
														</strong>
													)}
												</p>
											</td>
											<td>
												<button
													type="button"
													onClick={() => removeFromCart({ dispatch, id })}
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
				<BackToShop title="No items on cart" />
			)}
		</Container>
	);
};

export default ShoppingCart;
