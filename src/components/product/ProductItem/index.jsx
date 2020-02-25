import { addToCart } from "components/listing/actions";
import { Products, Section, SectionTitle } from "./styles";
import { useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";
import Container from "components/common/Container";
import Content from "components/product/components/Content";
import ProductCard from "components/common/ProductCard";
import Tabs from "components/common/Tabs";
import {
	TabAdditionInformation,
	TabDescription,
	TabReview
} from "../components/Tab";

export default ({
	categories,
	description,
	id,
	images,
	name,
	price,
	products,
	quantity,
	skus,
	tags
}) => {
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();

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
