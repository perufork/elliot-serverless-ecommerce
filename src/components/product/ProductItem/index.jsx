// import Modal from 'react-modal';
import Container from "components/common/Container";
import Content from "components/product/components/Content";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";

const ProductItem = ({
	id,
	title,
	name,
	price,
	quantity,
	sku = "AB1609456789",
	description
}) => (
	<Container>
		<BreadcumbsHeader id={id} title={title} />
		<Content
			id={id}
			title={title}
			name={name}
			price={price}
			quantity={quantity}
			sku={sku}
			description={description}
		/>
	</Container>
);

export default ProductItem;
