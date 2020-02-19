import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getProducts from "helpers/getProducts";
import Error from "next/error";
import getCollections from "helpers/getCollections";

export const unstable_getStaticPaths = async () => {
	const products = await getProducts();

	const localizedProducts = products.edges.map(({ node: { slug } }) =>
		locales.map(locale => `/${locale}/product/${slug}`)
	);

	return {
		paths: localizedProducts.flatMap(item => item)
	};
};

export const unstable_getStaticProps = async ({ params: { slug, lang } }) => {
	try {
		const collections = await getCollections();
		const products = await getProducts();

		const product = products.edges.find(
			({ node: { slug: _slug } }) => _slug === slug
		);
		return {
			revalidate: 10,
			props: { product: product.node, locale: lang, collections: collections }
		};
	} catch (error) {
		return {
			revalidate: 10,
			props: { product: {}, locale: lang, collections: [] }
		};
	}
};

const Product = ({ product, collections }) => (
	<Layout collections={collections}>
		{product.id ? <ProductItem {...product} /> : <Error statusCode={404} />}
	</Layout>
);

export default withLocale(Product);
