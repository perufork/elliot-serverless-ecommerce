import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";
import getCollections from "helpers/getCollections";
import SEO from "components/common/SEO";
import Error from "next/error";

const Index = ({ products, collections }) => (
	<Layout collections={collections}>
		{products?.edges?.length > 0 && collections?.edges?.length > 0 ? (
			<>
				<SEO title="shop.page.title" description="shop.page.description" />
				<Products products={products} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const unstable_getStaticProps = async ({ params: { lang } }) => {
	try {
		const products = await getProducts();
		const collections = await getCollections();

		return {
			props: {
				products,
				collections,
				locale: lang
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				products: [],
				collections: [],
				locale: lang
			}
		};
	}
};

export default withLocale(Index);
