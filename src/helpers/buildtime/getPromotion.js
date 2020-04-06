import axios from "axios";
import promotionQuery from "queries/promotion";
import buildCache from "./buildCache";
import { ELLIOT_STORE_FRONT_ID, ELLIOT_API_KEY } from "config";

export default async () => {
	return buildCache("getPromotion", () =>
		axios
			.post(
				"https://admin.elliot.store/api ",
				{
					query: promotionQuery,
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
			.then(res => res.data.data.node.promotion)
	);
};
