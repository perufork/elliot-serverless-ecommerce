import Container from "components/common/Container";
import Content from "components/product/components/Content";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";

const ProductItem = ({
	id,
	slug,
	name,
	price,
	quantity,
	skus,
	description,
	categories,
	tags,
	images
}) => (
	<Container>
		<BreadcumbsHeader slug={slug} title={name} />
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
);

export default ProductItem;
