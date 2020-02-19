import axios from "axios";
import collectionsQuery from "queries/collections";

export default async () => {
	const {
		data: {
			data: {
				node: { collections }
			}
		}
	} = await axios.post(
		process.env.ELLIOT_API,
		{
			query: collectionsQuery,
			variables: {
				domainId: process.env.ELLIOT_DOMAIN_ID,
				checkoutId: process.env.ELLIOT_STORE_FRONT_ID
			}
		},
		{
			headers: {
				"Content-Type": "application/json",
				KEY: `KEY ${process.env.ELLIOT_API_KEY}`
			}
		}
	);

	collections.edges.filter(({ node }) => node.products.edges.length !== 0);

	return collections;
};
