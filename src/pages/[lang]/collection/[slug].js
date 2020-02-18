import Layout from "components/common/Layout";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getCollections from "helpers/getCollections";
import Products from "components/listing/Products";

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
	const collections = await getCollections();
	const collection = collections.edges.find(
		({ node: { slug: _slug } }) => _slug === slug
	);
	return {
		revalidate: 10,
		props: { collection: collection.node, locale: lang }
	};
};

const Product = ({ collection }) => (
	<Layout>
		<Products products={collection.products} collection={collection} />
	</Layout>
);

export default withLocale(Product);
