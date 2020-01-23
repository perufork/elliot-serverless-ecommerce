import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import axios from "axios";
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

export const unstable_getStaticProps = async ({ params }) => {
	try {
		// const { data: products } = await axios.get(
		// 	`${process.env.BASE_URL}/api/product`
		// );

		const ProductsQuery = `
			query checkout($id: ID!) {
				node(id: $id) {
					... on CheckoutNode {
						products {
							edges {
								node {
									id
									name
									gender
									variantCount
									description
									quantity
									slug
									... on ProductNode {
										skus {
											edges {
												node {
													salePrice
												}
											}
										}
									}
									images(orderBy: "orderingPosition") {
										edges {
											node {
												id
												image
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`;

		const {
			data: {
				data: {
					node: { products }
				}
			}
		} = await axios.post(
			process.env.ELLIOT_API,
			{
				query: ProductsQuery,
				variables: {
					id: process.env.ELLIOT_STORE_FRONT_ID
				}
			},
			{
				headers: {
					"Content-Type": "application/json",
					authorization: process.env.ELLIOT_API_TOKEN
				}
			}
		);

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
