import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/getProducts";

const { title } = defineMessages({
	title: {
		id: "title",
		defaultMessage: "Title"
	}
});

const Index = ({ products }) => {
	const intl = useIntl();

	return (
		<Layout>
			<Head>
				<meta name="title" content={intl.formatMessage(title)} />
			</Head>
			<Products products={products} />
		</Layout>
	);
};

export const unstable_getStaticProps = async ({ params }) => {
	try {
		const products = await getProducts();

		return {
			props: {
				products,
				locale: params.lang
			}
		};
	} catch (error) {
		console.log(error);
	}
};

export default withLocale(Index);
