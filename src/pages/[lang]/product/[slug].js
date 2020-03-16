import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import getCheckout from "helpers/getCheckout";

export const getStaticPaths = async () => {
	const products = await getProducts();

	const localizedProducts = products.edges.map(({ node: { slug } }) =>
		locales.map(locale => `/${locale}/product/${slug}`)
	);

	return {
		paths: localizedProducts.flatMap(item => item),
		fallback: true
	};
};

export const getStaticProps = async ({ params: { slug, lang } }) => {
	try {
		const collections = await getCollections();
		const products = await getProducts();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();
		const checkout = await getCheckout();

		const product = products.edges.find(
			({ node: { slug: _slug } }) => _slug === slug
		);
		return {
			props: {
				product: product.node,
				locale: lang,
				collections,
				seoDetails,
				promotion,
				checkout
			}
		};
	} catch (error) {
		return {
			props: {
				product: {},
				locale: lang,
				collections: [],
				seoDetails: {},
				promotion: {},
				checkout: {}
			}
		};
	}
};

const Product = ({ product, collections, seoDetails, promotion, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
	>
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
					seoDetails={seoDetails}
				/>
				<ProductItem {...product} globalCollections={collections} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export default withLocale(Product);
