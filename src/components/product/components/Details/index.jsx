import { useState, Fragment } from "react";
// import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { addToCart, addCustomQuantityByProduct } from "components/cart/actions";
// import Stars from "components/common/Stars";
import Button from "components/common/Button";
import QuantityController from "components/common/QuantityController";
// import { HeartIcon } from "components/common/Icons";
import {
	FacebookIcon,
	PinterestIcon,
	TwiterIcon
} from "components/common/Icons/SocialIcon";
import {
	ButtonGroup,
	// Favorite,
	MainAction,
	// Review,
	Shop,
	Sku,
	SocialShares,
	// Specs,
	Wrapper
} from "./styles";

const Details = ({
	id,
	name,
	skus,
	description,
	// rating = 4,
	// review = 1,
	// categories,
	// tags,
	images,
	slug
}) => {
	const { state: currency } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const { locale } = useIntl();
	const [quantity, setQuantity] = useState(1);
	// const [attributes, setAttributes] = useState(null)

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
				{skus?.edges[0]?.node?.salePrice && (
					<p>
						<NumberFormat
							value={skus.edges[0].node.salePrice / 100}
							displayType={"text"}
							thousandSeparator={true}
							prefix={currency}
						/>
					</p>
				)}
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			{/* {skus &&
				skus?.edges?.map(
					({ node: { attributes } }) =>
						attributes &&
						Object.entries(attributes).map((value, i) => (
							<Fragment key={i}>
								<label>{value[0]}</label>
								<Select options={[{ value: value[1], label: value[1] }]} />
							</Fragment>
						))
				)} */}
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
										price: skus?.edges[0]?.node?.salePrice / 100,
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
					{/* <Favorite>
						<HeartIcon height={24} width={24} />
					</Favorite> */}
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
			{/* <Specs>
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
			</Specs> */}
			<SocialShares>
				<a
					href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Facebook"
				>
					<FacebookIcon />
				</a>
				<a
					href={`https://twitter.com/home?status=${process.env.BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Twitter"
				>
					<TwiterIcon />
				</a>
				<a
					href={`https://pinterest.com/pin/create/button/?url=${process.env.BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Pinterest"
				>
					<PinterestIcon />
				</a>
			</SocialShares>
		</Wrapper>
	);
};

export default Details;
