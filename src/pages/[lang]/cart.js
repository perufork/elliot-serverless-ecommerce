import Layout from "components/common/Layout";
import Items from "components/cart/Items";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import getCheckout from "helpers/getCheckout";

const Cart = ({ collections, seoDetails, promotion, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
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
		const promotion = await getPromotion();
		const checkout = await getCheckout();

		return {
			props: {
				collections: collections,
				seoDetails,
				locale: params.lang,
				promotion,
				checkout
			}
		};
	} catch (error) {
		return {
			props: {
				collections: [],
				seoDetails: {},
				locale: params.lang,
				promotion: {},
				checkout: {}
			}
		};
	}
};

export { getStaticPaths } from "./index";

export default withLocale(Cart);
