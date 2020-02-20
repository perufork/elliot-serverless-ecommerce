import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";

const Index = ({ products, collections }) => (
	<Layout collections={collections}>
		<SEO title="shop.page.title" description="shop.page.description" />
		<Products products={products} />
	</Layout>
);

export const unstable_getStaticProps = async ({ params }) => {
	try {
		const products = await getProducts();
		const collections = await getCollections();

		return {
			props: {
				products,
				collections,
				locale: params.lang
			}
		};
	} catch (error) {
		console.log(error);
	}
};

export default withLocale(Index);
