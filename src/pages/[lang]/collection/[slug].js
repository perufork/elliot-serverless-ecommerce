import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getCollections from "helpers/getCollections";
import getSeoDetails from "helpers/getSeoDetails";
import getPromotion from "helpers/getPromotion";

export const unstable_getStaticPaths = async () => {
	const collections = await getCollections();

	const localizedCollections = collections.edges.map(({ node: { slug } }) =>
		locales.map(locale => `/${locale}/collection/${slug}`)
	);

	return {
		paths: localizedCollections.flatMap(item => item)
	};
};

export const unstable_getStaticProps = async ({ params: { slug, lang } }) => {
	try {
		const collections = await getCollections();
		const seoDetails = await getSeoDetails();
		const promotion = await getPromotion();

		const collection = collections.edges.find(
			({ node: { slug: _slug } }) => _slug === slug
		);
		return {
			props: {
				collection: collection.node,
				locale: lang,
				collections,
				seoDetails,
				promotion
			}
		};
	} catch (error) {
		return {
			props: {
				collection: {},
				locale: lang,
				collections: [],
				seoDetails: {},
				promotion: {}
			}
		};
	}
};

const Product = ({ collection, collections, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		promotion={promotion}
	>
		{collection.products ? (
			<>
				<SEO
					title={collection.name}
					location={collection.slug}
					seoDetails={seoDetails}
				/>
				<Products products={collection.products} collection={collection} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export default withLocale(Product);
