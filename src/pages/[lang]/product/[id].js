import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getProducts from "helpers/getProducts";

export const unstable_getStaticPaths = async () => {
	const products = await getProducts();

	const localizedProducts = products.edges.map(({ node: { id } }) =>
		locales.map(locale => `/${locale}/product/${id}`)
	);

	return localizedProducts.flatMap(item => item);
};

export const unstable_getStaticProps = async ({ params: { id, lang } }) => {
	const products = await getProducts();
	const product = products.edges.find(({ node: { id: _id } }) => _id === id);
	return { revalidate: 10, props: { product: product.node, locale: lang } };
};

const Product = ({ product }) => (
	<Layout>
		<ProductItem {...product} />
	</Layout>
);

export default withLocale(Product);
