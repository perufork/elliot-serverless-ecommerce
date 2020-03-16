import axios from "axios";
import promotionQuery from "queries/promotion";
import buildCache from "./buildCache";

export default async () => {
	return buildCache("getPromotion", () =>
		axios
			.post(
				process.env.ELLIOT_API,
				{
					query: promotionQuery,
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
			.then(res => res.data.data.node.promotion)
	);
};
