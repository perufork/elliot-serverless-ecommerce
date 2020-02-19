import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";

const Checkout = ({ collections }) => (
	<Layout collections={collections}>
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
