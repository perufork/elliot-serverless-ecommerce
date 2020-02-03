import { FormattedMessage, useIntl } from "react-intl";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import Link from "next/link";
import {
	addQuantityByProduct,
	subtractQuantityByProduct
} from "components/cart/actions";
import { addToCart } from "components/listing/actions";
import Stars from "components/common/Stars";
import Button from "components/common/Button";
import QuantityController from "components/common/QuantityController";
import { HeartIcon } from "components/common/Icons";
import {
	ButtonGroup,
	Favorite,
	MainAction,
	Review,
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
	rating = 4,
	review = 1,
	categories,
	tags,
	images
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
				<h2>{name}</h2>
				{skus.edge &&
					skus.edges[0].node.orderSkus &&
					skus.edges[0].node.orderSkus.edges[0].node.sku.sku && (
						<Sku>SKU: {skus.edges[0].node.orderSkus.edges[0].node.sku.sku}</Sku>
					)}
				{skus.edges[0].node.salePrice && (
					<h5>
						<span>$</span> {skus.edges[0].node.salePrice}
					</h5>
				)}
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			<Shop>
				<QuantityController
					wide
					id={id}
					dispatch={dispatch}
					subtractQuantityByProduct={subtractQuantityByProduct}
					addQuantityByProduct={addQuantityByProduct}
					quantity={product ? product.quantity : 0}
				/>
				<ButtonGroup>
					<Button
						onClick={() => {
							addToCart({
								dispatch,
								payload: { id, name, skus, price, description, images }
							});
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
