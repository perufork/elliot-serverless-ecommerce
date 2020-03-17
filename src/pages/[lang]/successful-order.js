import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import SuccessfulOrder from "components/shipping/SuccessfulOrder";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import getCheckout from "helpers/getCheckout";
import locales from "helpers/locales";

const OrderFailed = ({ collections, seoDetails, promotion, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
	>
		<SEO
			localizedTitle="shop.page.title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<SuccessfulOrder email={checkout?.domain?.company?.address?.email} />
	</Layout>
);

export const getStaticPaths = () => {
	return {
		paths: locales.map(locale => ({ params: { lang: locale } })),
		fallback: true
	};
};

export const getStaticProps = async ({ params: { lang } }) => {
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

export default withLocale(OrderFailed);
