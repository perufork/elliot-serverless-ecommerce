// import { addToCart } from "components/cart/actions";
// import { useDispatchCart } from "providers/CartProvider";
// import { useDispatchSidebar } from "providers/SidebarProvider";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";
import Container from "components/common/Container";
import Content from "components/product/components/Content";
// import ProductCard from "components/common/ProductCard";
import Tabs from "components/common/Tabs";
import {
	TabAdditionInformation,
	TabDescription
	// TabReview
} from "components/product/components/Tab";
// import { Products, Section, SectionTitle } from "./styles";

export default ({
	categories,
	description,
	id,
	slug,
	name,
	// products,
	quantity,
	skus,
	tags,
	images
}) => {
	// const { dispatch } = useDispatchCart();
	// const { dispatch: dispatchSidebar } = useDispatchSidebar();

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
					categories={categories}
					tags={tags}
					slug={slug}
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
						// { title: "Review", content: <TabReview  /> }
					]}
				/>
			</Container>
			{/* <Section as={Container}>
				<SectionTitle>Related Products</SectionTitle>
				<Products grid={true}>
					{products?.edges.map(({ node }, i) => (
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
			</Section> */}
		</>
	);
};
