import { useState } from "react";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addToCart, addCustomQuantityByProduct } from "components/cart/actions";
// import Stars from "components/common/Stars";
import Button from "components/common/Button";
import QuantityController from "components/common/QuantityController";
import { HeartIcon } from "components/common/Icons";
import {
	ButtonGroup,
	Favorite,
	MainAction,
	// Review,
	Shop,
	Sku,
	SocialShares,
	Specs,
	Wrapper
} from "./styles";
import {
	FacebookIcon,
	PinterestIcon,
	TwiterIcon
} from "components/common/Icons/SocialIcon";

const Details = ({
	id,
	name,
	skus,
	price,
	description,
	// rating = 4,
	// review = 1,
	categories,
	tags,
	images
}) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const { locale } = useIntl();
	const [quantity, setQuantity] = useState(1);

	const product = state.data && state.data.find(item => item.id === id);

	return (
		<Wrapper>
			<div>
				{/* <Review>
					<Stars stars={rating} />
					<span>
						{review} <FormattedMessage id="product.review" />
					</span>
				</Review> */}
				<h2>{name}</h2>
				{skus?.edges[0]?.node?.orderSkus?.edges[0]?.node?.sku?.sku && (
					<Sku>SKU: {skus.edges[0].node.orderSkus.edges[0].node.sku.sku}</Sku>
				)}
				{skus.edges[0].node.salePrice && (
					<p>
						<span>$</span> {skus.edges[0].node.salePrice / 100}
					</p>
				)}
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			<Shop>
				<QuantityController
					wide
					id={id}
					setQuantity={setQuantity}
					quantity={quantity}
				/>
				<ButtonGroup>
					<Button
						onClick={() => {
							if (product && product.quantity > 0) {
								addCustomQuantityByProduct({ dispatch, id, quantity });
							} else {
								addToCart({
									dispatch,
									payload: {
										id,
										name,
										skus,
										price,
										description,
										images,
										quantity
									}
								});
							}
							dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
						}}
						type="button"
						variant="primary"
						wide
					>
						<FormattedMessage id="button.add_to_cart" />
					</Button>
					<Favorite>
						<HeartIcon height={24} width={24} />
					</Favorite>
				</ButtonGroup>
				<MainAction>
					<Button
						onClick={() => alert("buy now")}
						type="button"
						variant="primary"
						wide
					>
						<FormattedMessage id="button.buy_now" />
					</Button>
				</MainAction>
			</Shop>
			<Specs>
				{categories && (
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
				)}
				{tags && (
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
				)}
			</Specs>
			<SocialShares>
				<a href="#">
					<FacebookIcon />
				</a>
				<a href="#">
					<TwiterIcon />
				</a>
				<a href="#">
					<PinterestIcon />
				</a>
			</SocialShares>
		</Wrapper>
	);
};

export default Details;
