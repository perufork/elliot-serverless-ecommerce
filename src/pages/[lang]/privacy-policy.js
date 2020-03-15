import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Container from "components/common/Container";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";
import getCheckout from "helpers/getCheckout";
import getLegal from "helpers/getLegal";

const Index = ({
	privacyPolicy,
	collections,
	seoDetails,
	promotion,
	checkout
}) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
		checkout={checkout}
	>
		{privacyPolicy ? (
			<>
				<SEO
					localizedTitle="shop.page.title"
					localizedDescription="shop.page.description"
					seoDetails={seoDetails}
				/>
				<Container>
					<div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
				</Container>
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const unstable_getStaticProps = async ({ params: { lang } }) => {
	try {
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();
		const checkout = await getCheckout();
		const { privacyPolicy } = await getLegal();

		return {
			props: {
				privacyPolicy,
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
				privacyPolicy: "",
				collections: [],
				seoDetails: {},
				locale: lang,
				promotion: {},
				checkout: {}
			}
		};
	}
};

export default withLocale(Index);
