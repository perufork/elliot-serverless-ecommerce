import { useEffect, useState } from "react";
import ProductCard from "components/common/ProductCard";
import Container from "components/common/Container";
import Tabs from "components/common/Tabs";
import Content from "components/product/components/Content";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";
import getProducts from "helpers/getProducts";
import { Products, Section, SectionTitle } from "./styles";
import {
	TabAdditionInformation,
	TabDescription,
	TabReview
} from "../components/Tab";

const ProductItem = ({
	id,
	name,
	price,
	quantity,
	skus,
	description,
	categories,
	tags,
	images
}) => {
	const [products, setProducts] = useState();

	const fetchRelatedProducts = async () => {
		const relatedProducts = await getProducts();
		return relatedProducts;
	};

	useEffect(() => {
		setProducts(fetchRelatedProducts());
	}, []);

	return (
		<>
			<Container>
				<BreadcumbsHeader id={id} title={name} />
				<Content
					id={id}
					name={name}
					price={price}
					quantity={quantity}
					skus={skus}
					images={images}
					description={description}
					categories={categories}
					tags={tags}
				/>
			</Container>
			<Container>
				<Tabs
					content={[
						{ title: "Description", content: <TabDescription /> },
						{
							title: "Additional Information",
							content: <TabAdditionInformation />
						},
						{ title: "Review", content: <TabReview /> }
					]}
				/>
			</Container>
			<Section as={Container}>
				<SectionTitle>Related Products</SectionTitle>
				<Products grid={true}>
					{products?.edges?.map(({ node }, i) => (
						<ProductCard
							key={i}
							onClick={() => {
								addToCart({ dispatch, payload: node });
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							grid={grid}
							{...node}
						/>
					))}
				</Products>
			</Section>
		</>
	);
};

export default ProductItem;
