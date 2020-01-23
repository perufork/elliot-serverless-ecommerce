import axios from "axios";
import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";

const getProducts = async () => {
	const { data: products } = await axios.get(
		`${process.env.BASE_URL}/api/product`
	);

	return products;
};

export const unstable_getStaticPaths = async () => {
	const products = await getProducts();

	const localizedProducts = products.map(({ id }) =>
		locales.map(item => `/${item}/product/${id}`)
	);

	return localizedProducts.flatMap(item => item);
};

export const unstable_getStaticProps = async ({ params: { id, lang } }) => {
	const products = await getProducts();
	const product = products.find(({ id: _id }) => _id === id);
	return { revalidate: 10, props: { product, locale: lang } };
};

const Product = ({ product }) => (
	<Layout>
		<ProductItem {...product} />
	</Layout>
);

export default withLocale(Product);
