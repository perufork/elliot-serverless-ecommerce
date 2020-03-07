import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import SEO from "components/common/SEO";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import getCheckout from "helpers/getCheckout";

const Checkout = ({ collections, checkout }) => (
	<Layout collections={collections}>
		<SEO
			localizedTitle="shop.page.checkout_title"
			localizedDescription="shop.page.description"
		/>
		<OrderCheckout checkout={checkout} />
	</Layout>
);

export const unstable_getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();
		const checkout = await getCheckout();
		return {
			props: {
				collections: collections,
				locale: params.lang,
				checkout
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
