import axios from "axios";
import productsQuery from "queries/products";

export default async () => {
	const {
		data: {
			data: {
				node: { products }
			}
		}
	} = await axios.post(
		process.env.ELLIOT_API,
		{
			query: productsQuery,
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

	return products;
};
