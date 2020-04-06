import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Container from "components/common/Container";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";

const Index = ({ legal, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		{legal?.faqs ? (
			<>
				<SEO
					localizedTitle="shop.page.title"
					localizedDescription="shop.page.description"
					seoDetails={seoDetails}
				/>
				<Container>
					<div dangerouslySetInnerHTML={{ __html: legal.faqs }} />
				</Container>
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const getStaticProps = async ({ params: { lang } }) => {
	try {
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const checkout = await getCheckout();
		const legal = await getLegal();

		return {
			props: {
				legal,
				collections,
				seoDetails,
				locale: lang,
				checkout
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				legal: {},
				collections: [],
				seoDetails: {},
				locale: lang,
				checkout: {}
			}
		};
	}
};

export { getStaticPaths } from "./index";

export default withLocale(Index);
