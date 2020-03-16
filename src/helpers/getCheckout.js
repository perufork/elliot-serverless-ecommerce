import axios from "axios";
import checkoutQuery from "queries/checkout";
import buildCache from "./buildCache";

export default async () => {
	return buildCache("getCheckout", () =>
		axios
			.post(
				process.env.ELLIOT_API,
				{
					query: checkoutQuery,
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
			.then(res => res.data.data.node)
	);
};
