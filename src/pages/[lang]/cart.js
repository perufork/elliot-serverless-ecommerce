import Layout from "components/common/Layout";
import Items from "components/cart/Items";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import SEO from "components/common/SEO";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";

const Cart = ({ legal, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		<SEO
			localizedTitle="shop.page.cart_title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<Items />
	</Layout>
);

export const getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const checkout = await getCheckout();
		const legal = await getLegal();

		return {
			props: {
				collections: collections,
				seoDetails,
				locale: params.lang,
				checkout,
				legal
			}
		};
	} catch (error) {
		return {
			props: {
				collections: [],
				seoDetails: {},
				locale: params.lang,
				checkout: {},
				legal: {}
			}
		};
	}
};

export { getStaticPaths } from "./index";

export default withLocale(Cart);
