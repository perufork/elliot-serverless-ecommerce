import axios from "axios";
import buildCache from "helpers/buildtime/buildCache";
import productsSlugs from "queries/productsSlugs";
import { ELLIOT_STORE_FRONT_ID, ELLIOT_API_KEY } from "config";

export default async () => {
	return buildCache("getProductsSlugs", () =>
		axios
			.post(
				"https://admin.elliot.store/api ",
				{
					query: productsSlugs,
					variables: {
						id: ELLIOT_STORE_FRONT_ID
					}
				},
				{
					headers: {
						"Content-Type": "application/json",
						KEY: `KEY ${ELLIOT_API_KEY}`
					}
				}
			)
			.then(res => res.data.data.node.products)
	);
};
