import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import locales from "helpers/locales";

const Index = ({ products, collections, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
	>
		{products?.edges?.length > 0 ? (
			<>
				<SEO
					localizedTitle="shop.page.title"
					localizedDescription="shop.page.description"
					seoDetails={seoDetails}
				/>
				<Products products={products} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const getStaticPaths = async () => ({
	paths: locales.map(locale => `/${locale}/`),
	fallback: false
});

export const getStaticProps = async ({ params: { lang } }) => {
	try {
		const products = await getProducts();
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();

		return {
			props: {
				products,
				collections,
				seoDetails,
				locale: lang,
				promotion
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				products: [],
				collections: [],
				seoDetails: {},
				locale: lang,
				promotion: {}
			}
		};
	}
};

export default withLocale(Index);
