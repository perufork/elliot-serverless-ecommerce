import fetch from "isomorphic-unfetch";
import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";

async function getProducts() {
	const response = await fetch(`${process.env.BASE_URL}/api/product`);
	const products = await response.json();

	return products;
}

export async function unstable_getStaticPaths() {
	const products = await getProducts();
	return products.map(({ id }) => `/product/${id}`);
}

export async function unstable_getStaticProps({ params: { id } }) {
	const products = await getProducts();
	const product = products.find(({ id: _id }) => _id === id);
	return { props: { product } };
}

const Product = ({ product }) => (
	<Layout>
		<ProductItem {...product} />
	</Layout>
);

export default Product;
