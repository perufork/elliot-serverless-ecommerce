import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import fetch from "isomorphic-unfetch";

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

Index.getInitialProps = async () => {
	const response = await fetch(`${process.env.BASE_URL}/api/product`);
	const products = await response.json();

	return { products };
};

export default Index;
