import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";

const Checkout = ({ collections }) => (
	<Layout collections={collections}>
		<SEO
			localizedTitle="shop.page.checkout_title"
			localizedDescription="shop.page.description"
		/>
		<OrderCheckout />
	</Layout>
);

export const unstable_getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();

		return {
			props: {
				collections: collections,
				locale: params.lang
			}
		};
	} catch (error) {
		return {
			props: {
				locale: params.lang,
				collections: []
			}
		};
	}
};

export default withLocale(Checkout);
