import axios from "axios";
import buildCache from "./buildCache";
import collectionsQuery from "queries/collections";

export default async () => {
	return buildCache("getCollections", () =>
		axios
			.post(
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
			)
			.then(res => res.data.data.node.collections)
	);
};
