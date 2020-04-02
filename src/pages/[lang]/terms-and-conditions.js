import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Container from "components/common/Container";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getPromotion from "helpers/buildtime/getPromotion";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";

const Index = ({ legal, collections, seoDetails, promotion, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
		legal={legal}
	>
		{legal?.termsAndConditions ? (
			<>
				<SEO
					localizedTitle="shop.page.title"
					localizedDescription="shop.page.description"
					seoDetails={seoDetails}
				/>
				<Container>
					<div dangerouslySetInnerHTML={{ __html: legal.termsAndConditions }} />
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
		const promotion = await getPromotion();
		const checkout = await getCheckout();
		const legal = await getLegal();

		return {
			props: {
				legal,
				collections,
				seoDetails,
				locale: lang,
				promotion,
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
				promotion: {},
				checkout: {}
			}
		};
	}
};

export { getStaticPaths } from "./index";

export default withLocale(Index);
