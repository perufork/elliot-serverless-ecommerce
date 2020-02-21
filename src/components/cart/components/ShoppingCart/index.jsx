import Link from "next/link";
import { useCart, useDispatchCart } from "providers/CartProvider";
import Container from "components/common/Container";
import Button from "components/common/Button";
import Swatch from "components/common/Swatch";
import QuantityController from "components/common/QuantityController";
import { CancelIcon } from "components/common/Icons";
import {
	removeFromCart,
	addQuantityByProduct,
	subtractQuantityByProduct
} from "components/cart/actions";
import {
	TableWrapper,
	Table,
	Thead,
	Tbody,
	Product,
	Thumbnail,
	Content,
	Center
} from "./styles";
import { useIntl } from "react-intl";

const ShoppingCart = () => {
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
								({ id, images, name, skus, quantity, description }) => (
									<tr key={id}>
										<td>
											<Product>
												<Thumbnail>
													<Link href="/[lang]/" as={`/${locale}/`}>
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
														href="/[lang]/product/[id]"
														as={`/${locale}/product/${id}`}
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
											{skus.edges[0].node.salePrice && (
												<strong>${skus.edges[0].node.salePrice}</strong>
											)}
										</td>
										<td>
											<QuantityController
												id={id}
												dispatch={dispatch}
												subtractQuantityByProduct={subtractQuantityByProduct}
												addQuantityByProduct={addQuantityByProduct}
												quantity={quantity}
											/>
										</td>
										<td style={{ minWidth: "120px" }}>
											<p>
												{skus.edges[0].node.salePrice && (
													<strong>
														${skus.edges[0].node.salePrice * quantity}
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
								)
							)}
						</Tbody>
					</Table>
				</TableWrapper>
			) : (
				<Center>
					<h2>No items on cart</h2>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<Button as="a" variant="primary">
							Back to Shop
						</Button>
					</Link>
				</Center>
			)}
		</Container>
	);
};

export default ShoppingCart;
