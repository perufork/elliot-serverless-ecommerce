import Layout from "components/common/Layout";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getCollections from "helpers/getCollections";
import Products from "components/listing/Products";
import Error from "next/error";
import SEO from "components/common/SEO";

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
		const collection = collections.edges.find(
			({ node: { slug: _slug } }) => _slug === slug
		);
		return {
			props: {
				collection: collection.node,
				locale: lang,
				collections: collections
			}
		};
	} catch (error) {
		return {
			props: { collection: {}, locale: lang, collections: [] }
		};
	}
};

const Product = ({ collection, collections }) => (
	<Layout collections={collections}>
		{collection.products ? (
			<>
				<SEO title={collection.name} location={collection.slug} />
				<Products products={collection.products} collection={collection} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export default withLocale(Product);
