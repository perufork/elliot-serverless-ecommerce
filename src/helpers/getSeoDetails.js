import axios from "axios";
import seoQuery from "queries/seo";
import buildCache from "./buildCache";

export default async () => {
	return buildCache("getSeoDetails", () =>
		axios
			.post(
				process.env.ELLIOT_API,
				{
					query: seoQuery,
					variables: {
						id: process.env.ELLIOT_STORE_FRONT_ID
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
