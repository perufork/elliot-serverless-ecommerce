import { FormattedMessage, useIntl } from "react-intl";
import { Flex, Item } from "react-flex-ready";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import {
	addQuantityByProduct,
	subtractQuantityByProduct
} from "components/cart/actions";
import { addToCart } from "components/listing/actions";
import Stars from "components/common/Stars";
import Button from "components/common/Button";
import QuantityController from "components/common/QuantityController";
import { HeartIcon } from "components/common/Icons";
import { Wrapper, Review, Sku, Shop, Favorite, Specs } from "./styles";
import Link from "next/link";

const Details = ({
	id,
	title,
	sku,
	price,
	description,
	rating = 4,
	review = 1,
	categories,
	tags
}) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const { locale } = useIntl();

	const product = state.data && state.data.find(item => item.id === id);

	return (
		<Wrapper>
			<div>
				<Review>
					<Stars stars={rating} />
					<span>
						{review} <FormattedMessage id="product.review" />
					</span>
				</Review>
				<h2>{title}</h2>
				<Sku>SKU: {sku}</Sku>
				<h4>${price}</h4>
			</div>
			<div>
				<p>{description}</p>
			</div>
			<Shop>
				<Flex css="margin-bottom: 2rem;">
					<Item col={3} colTablet={3} colMobile={12} gap={1} stretch>
						<QuantityController
							wide
							id={id}
							dispatch={dispatch}
							subtractQuantityByProduct={subtractQuantityByProduct}
							addQuantityByProduct={addQuantityByProduct}
							quantity={product ? product.quantity : 0}
						/>
					</Item>
					<Item col={7} colTablet={7} colMobile={12} gap={1} stretch>
						<Button
							onClick={() => {
								addToCart({
									dispatch,
									payload: { id, title, price, description }
								});
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							type="button"
							variant="primary"
							wide
						>
							<FormattedMessage id="button.add_to_cart" />
						</Button>
					</Item>
					<Item col={2} colTablet={2} colMobile={12} gap={1} stretch>
						<Favorite>
							<HeartIcon />
						</Favorite>
					</Item>
				</Flex>
				<Button
					onClick={() => alert("buy now")}
					type="button"
					variant="primary"
					wide
				>
					<FormattedMessage id="button.buy_now" />
				</Button>
			</Shop>
			<Specs>
				<p>
					<strong>
						<FormattedMessage id="product.category" />:
					</strong>
					{categories.map((item, i) => (
						<Link key={i} href={`/[lang]/`} as={`/${locale}/`}>
							<a>{item}</a>
						</Link>
					))}
				</p>
				<p>
					<strong>
						<FormattedMessage id="product.tags" />:
					</strong>
					{tags.map((item, i) => (
						<Link key={i} href={`/[lang]/`} as={`/${locale}/`}>
							<a>{item}</a>
						</Link>
					))}
				</p>
			</Specs>
			{/* <div class="ps-product__sharing">
				<a href="#">
					<i class="fa fa-facebook"></i>
				</a>
				<a href="#">
					<i class="fa fa-twitter"></i>
				</a>
				<a href="#">
					<i class="fa fa-pinterest"></i>
				</a>
			</div> */}
		</Wrapper>
	);
};

export default Details;
