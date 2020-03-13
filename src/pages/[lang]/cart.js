import Layout from "components/common/Layout";
import Items from "components/cart/Items";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";

const Cart = ({ collections, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
	>
		<SEO
			localizedTitle="shop.page.cart_title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<Items />
	</Layout>
);

export const unstable_getStaticProps = async ({ params }) => {
	try {
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();

		return {
			props: {
				collections: collections,
				seoDetails,
				locale: params.lang,
				promotion
			}
		};
	} catch (error) {
		return {
			props: {
				collections: [],
				seoDetails: {},
				locale: params.lang,
				promotion: {}
			}
		};
	}
};

export default withLocale(Cart);
