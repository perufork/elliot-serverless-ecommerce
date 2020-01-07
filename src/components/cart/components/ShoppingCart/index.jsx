import Link from "next/link";
import { useCart, useDispatchCart } from "providers/CartProvider";
import Container from "components/common/Container";
import Swatch from "components/common/Swatch";
import { MinusIcon, PlusIcon, CancelIcon } from "components/common/Icons";
import {
	removeFromCart,
	addQuantityByProduct,
	subtractQuantityByProduct
} from "components/cart/actions";
import thumbnailImage from "assets/product/product.jpg";
import {
	TableWrapper,
	Table,
	Thead,
	Tbody,
	Product,
	Thumbnail,
	Content,
	QuantityController,
	Controller,
	Center
} from "./styles";
import Button from "components/common/Button";

const ShoppingCart = () => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();

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
							{state.data.map(({ id, title, price, quantity }) => (
								<tr key={id}>
									<td>
										<Product>
											<Thumbnail>
												<Link href="/">
													<a>
														<img src={thumbnailImage} alt={title} />
													</a>
												</Link>
											</Thumbnail>
											<Content>
												<Link href={`/product/${id}`}>
													<a>{title}</a>
												</Link>
												<p>Apple</p>
											</Content>
										</Product>
									</td>
									<td>
										<Swatch color="#70849d" />
									</td>
									<td>M</td>
									<td>
										<strong>${price}</strong>
									</td>
									<td>
										<QuantityController>
											<Controller
												disabled={quantity === 1}
												onClick={() =>
													subtractQuantityByProduct({ dispatch, id })
												}
											>
												<MinusIcon
													color={quantity === 1 && "#bbb"}
													width={16}
													height={16}
												/>
											</Controller>
											<input type="text" value={quantity} readOnly />
											<Controller
												onClick={() => addQuantityByProduct({ dispatch, id })}
											>
												<PlusIcon width={16} height={16} />
											</Controller>
										</QuantityController>
									</td>
									<td>
										<p>
											<strong>${price}</strong>
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
							))}
						</Tbody>
					</Table>
				</TableWrapper>
			) : (
				<Center>
					<h2>No items on cart</h2>
					<Link href="/">
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
