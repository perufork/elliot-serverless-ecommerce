import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import SEO from "components/common/SEO";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import getCheckout from "helpers/getCheckout";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import locales from "helpers/locales";

const Checkout = ({ collections, checkout, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
	>
		<SEO
			localizedTitle="shop.page.checkout_title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<OrderCheckout checkout={checkout} />
	</Layout>
);

export const getStaticPaths = async () => ({
	paths: locales.map(locale => `/${locale}/checkout/`),
	fallback: false
});

export const getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();
		const checkout = await getCheckout();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();

		return {
			props: {
				collections,
				seoDetails,
				checkout,
				locale: params.lang,
				promotion
			}
		};
	} catch (error) {
		return {
			props: {
				locale: params.lang,
				seoDetails: {},
				collections: [],
				promotion: {}
			}
		};
	}
};

export default withLocale(Checkout);
