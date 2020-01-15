import fetch from "isomorphic-unfetch";
import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";

const Product = ({ data, status }) => (
	<Layout>
		{status === 200 ? <ProductItem {...data} /> : <p>{data.message}</p>}
	</Layout>
);

Product.getInitialProps = async ({ query }) => {
	const response = await fetch(
		`${process.env.BASE_URL}/api/product/${query.id}`
	);

	const data = await response.json();
	return { data, status: response.status };
};

export default Product;
