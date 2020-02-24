import Layout from "components/common/Layout";
import Items from "components/cart/Items";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";

const Cart = ({ collections }) => (
	<Layout collections={collections}>
		<SEO title="shop.page.cart_title" description="shop.page.description" />
		<Items />
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

export default withLocale(Cart);
