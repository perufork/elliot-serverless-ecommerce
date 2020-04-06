import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import SuccessfulOrder from "components/shipping/SuccessfulOrder";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/buildtime/getProducts";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import locales from "helpers/i18n/locales";
import getLegal from "helpers/buildtime/getLegal";

const OrderFailed = ({ legal, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
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
		const checkout = await getCheckout();
		const legal = await getLegal();

		return {
			props: {
				products,
				collections,
				seoDetails,
				locale: lang,
				checkout,
				legal
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
				checkout: {},
				legal: {}
			}
		};
	}
};

export default withLocale(OrderFailed);
