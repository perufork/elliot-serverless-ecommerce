import Layout from "components/common/Layout";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getProducts from "helpers/getProducts";
import Error from "next/error";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";

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
			props: { product: product.node, locale: lang, collections: collections }
		};
	} catch (error) {
		return {
			props: { product: {}, locale: lang, collections: [] }
		};
	}
};

const Product = ({ product, collections }) => (
	<Layout collections={collections}>
		{product.id ? (
			<>
				<SEO
					title={product.productSeo?.edges[0]?.node?.title || product.name}
					description={
						product.productSeo?.edges[0]?.node?.description ||
						product.description?.replace(/(<([^>]+)>)/gi, "")
					}
					location={product.slug}
					cover={`${process.env.ELLIOT_BASE_IMAGE_URL}${product.images?.edges[0]?.node?.image}`}
				/>
				<ProductItem {...product} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export default withLocale(Product);
