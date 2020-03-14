import { useDispatchCart, useCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addQuantityByProduct, addToCart } from "components/cart/actions";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";
import Container from "components/common/Container";
import Content from "components/product/components/Content";
import ProductCard from "components/common/ProductCard";
import Tabs from "components/common/Tabs";
import {
	TabAdditionInformation,
	TabDescription
} from "components/product/components/Tab";
import { Products, Section, SectionTitle } from "./styles";

export default ({
	globalCollections,
	collections,
	description,
	id,
	slug,
	name,
	quantity,
	skus,
	tags,
	images,
	attributes,
	metadata,
	gender
}) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();

	const handleCart = (node, item) => {
		if (item?.quantity >= 1) {
			addQuantityByProduct({
				dispatch,
				id: item.product.id,
				skuId: item.sku.id
			});
		} else {
			addToCart({
				dispatch,
				payload: {
					product: node,
					quantity: 1,
					sku: node.skus?.edges[0]?.node
				}
			});
		}
		dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
	};

	const ids = [];

	return (
		<>
			<Container>
				<BreadcumbsHeader slug={slug} title={name} />
				<Content
					id={id}
					name={name}
					quantity={quantity}
					skus={skus}
					images={images}
					description={description}
					collections={collections}
					gender={gender}
					tags={tags}
					slug={slug}
					attributes={attributes}
					metadata={metadata}
				/>
			</Container>
			<Container>
				<Tabs
					content={[
						{
							title: "Description",
							content: <TabDescription description={description} />
						},
						{
							title: "Additional Information",
							content: <TabAdditionInformation skus={skus} />
						}
					]}
				/>
			</Container>
			<Section as={Container}>
				<SectionTitle>Related Products</SectionTitle>
				<Products grid={true}>
					{globalCollections?.edges
						.filter(collection =>
							collections.edges.find(
								item => item.node.id === collection.node.id
							)
						)
						.map(({ node: { products } }) =>
							products?.edges
								.filter(({ node }) => node.id !== id)
								.map(({ node }, i) => {
									const item = state?.data?.find(
										({ product }) => product.id === node.id
									);

									if (ids.includes(node.id)) return null;

									ids.push(node.id);

									return (
										<ProductCard
											key={i}
											onClick={() => handleCart(node, item)}
											grid
											{...node}
										/>
									);
								})
						)}
				</Products>
			</Section>
		</>
	);
};
