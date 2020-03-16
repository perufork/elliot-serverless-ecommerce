import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import getCheckout from "helpers/getCheckout";
import locales from "helpers/locales";

const Index = ({ products, collections, seoDetails, promotion, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
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

export const unstable_getStaticPaths = () => {
	return {
		paths: locales.map(locale => `/${locale}/`)
	};
};

export const unstable_getStaticProps = async ({ params: { lang } }) => {
	try {
		const products = await getProducts();
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();
		const checkout = await getCheckout();

		return {
			props: {
				products,
				collections,
				seoDetails,
				locale: lang,
				promotion,
				checkout
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
				promotion: {},
				checkout: {}
			}
		};
	}
};

export default withLocale(Index);
