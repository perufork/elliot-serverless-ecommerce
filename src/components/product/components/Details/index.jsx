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
import Label from "components/common/Label";
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
	Wrapper,
	LabelField
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
	slug,
	attributes,
	quantity: inventoryQuantity
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const { locale } = useIntl();
	const [quantity, setQuantity] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState(
		skus?.edges[0]?.node || null
	);

	const itemProduct = state?.data?.find(
		item => item.product.id === id && item.sku.id === selectedVariant.id
	);

	const handleVariant = (attributeKey, value) => {
		skus.edges.map(({ node }) => {
			Object.keys(node.attributes).map(item => {
				if (item === attributeKey && node.attributes[item] === value) {
					setSelectedVariant(node);
				}
			});
		});
	};

	const handleCart = () => {
		if (itemProduct?.quantity > 0) {
			addCustomQuantityByProduct({
				dispatch,
				id,
				skuId: selectedVariant.id,
				quantity
			});
		} else {
			addToCart({
				dispatch,
				payload: {
					product: {
						id,
						name,
						description,
						images,
						slug,
						attributes
					},
					quantity,
					sku: selectedVariant
				}
			});
		}
		dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
	};

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
				{selectedVariant?.orderSkus?.edges[0]?.node.sku?.sku && (
					<Sku>SKU: {selectedVariant?.orderSkus?.edges[0]?.node.sku?.sku}</Sku>
				)}
				{selectedVariant?.salePrice && (
					<p>
						{loading ? (
							"..."
						) : (
							<NumberFormat
								value={(selectedVariant.salePrice * exchangeRate) / 100}
								displayType={"text"}
								thousandSeparator={true}
								prefix={currency}
							/>
						)}
						{parseInt(inventoryQuantity) <= 0 && (
							<Label>
								<span>OUT OF STOCK</span>
							</Label>
						)}
					</p>
				)}
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			{attributes &&
				attributes.map(({ attributeKey, attributeValues }, i) => {
					const options = attributeValues.map((_item, i) => {
						return { value: attributeValues[i], label: attributeValues[i] };
					});
					return (
						<Fragment key={i}>
							<LabelField>{attributeKey}</LabelField>
							<Select
								onChange={e => handleVariant(attributeKey, e.value)}
								options={options}
								defaultValue={{
									label:
										selectedVariant.attributes[
											Object.keys(selectedVariant.attributes)[0]
										],
									value:
										selectedVariant.attributes[
											Object.keys(selectedVariant.attributes)[0]
										]
								}}
							/>
						</Fragment>
					);
				})}
			<Shop>
				<QuantityController
					wide
					id={id}
					setQuantity={setQuantity}
					quantity={quantity}
				/>
				<ButtonGroup>
					<Button
						disabled={parseInt(inventoryQuantity) <= 0}
						onClick={handleCart}
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
