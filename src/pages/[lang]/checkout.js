import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import SEO from "components/common/SEO";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import getCheckout from "helpers/buildtime/getCheckout";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getPromotion from "helpers/buildtime/getPromotion";
import getLegal from "helpers/buildtime/getLegal";

const Checkout = ({ legal, collections, checkout, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
		legal={legal}
	>
		<SEO
			localizedTitle="shop.page.checkout_title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<OrderCheckout checkout={checkout} promotion={promotion} />
	</Layout>
);

export const getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();
		const checkout = await getCheckout();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();
		const legal = await getLegal();

		return {
			props: {
				collections,
				seoDetails,
				checkout,
				locale: params.lang,
				promotion,
				legal
			}
		};
	} catch (error) {
		return {
			props: {
				locale: params.lang,
				seoDetails: {},
				collections: [],
				promotion: {},
				legal: {}
			}
		};
	}
};

export { getStaticPaths } from "./index";

export default withLocale(Checkout);
