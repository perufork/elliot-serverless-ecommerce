import axios from "axios";
import buildCache from "./buildCache";
import productsQuery from "queries/products";

export default async () => {
	return buildCache("getProducts", () =>
		axios
			.post(
				process.env.ELLIOT_API,
				{
					query: productsQuery,
					variables: {
						id: process.env.ELLIOT_STORE_FRONT_ID,
						domainId: process.env.ELLIOT_DOMAIN_ID
					}
				},
				{
					headers: {
						"Content-Type": "application/json",
						KEY: `KEY ${process.env.ELLIOT_API_KEY}`
					}
				}
			)
			.then(res => res.data.data.node.products)
	);
};
