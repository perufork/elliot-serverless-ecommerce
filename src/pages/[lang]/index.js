import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import fetch from "isomorphic-unfetch";
import withLocale from "hoc/withLocale";

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

export async function unstable_getStaticProps({ params }) {
	try {
		const response = await fetch(`${process.env.BASE_URL}/api/product`);
		const products = await response.json();

		return {
			props: {
				products,
				locale: params.lang
			}
		};
	} catch (error) {
		console.log(error);
	}
}

export default withLocale(Index);
