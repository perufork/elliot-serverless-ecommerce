import Layout from "components/common/Layout";
import withLocale from "hoc/withLocale";
import locales from "helpers/locales";
import getCollections from "helpers/getCollections";

export const unstable_getStaticPaths = async () => {
	const collections = await getCollections();

	const localizedCollections = collections.edges.map(({ node: { id } }) =>
		locales.map(locale => `/${locale}/collection/${id}`)
	);

	return localizedCollections.flatMap(item => item);
};

export const unstable_getStaticProps = async ({ params: { id, lang } }) => {
	const collections = await getCollections();
	const collection = collections.edges.find(
		({ node: { id: _id } }) => _id === id
	);
	return {
		revalidate: 10,
		props: { collection: collection.node, locale: lang }
	};
};

const Product = ({ collection }) => (
	<Layout>
		<h2>{collection.name}</h2>
	</Layout>
);

export default withLocale(Product);
