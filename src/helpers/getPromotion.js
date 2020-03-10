import axios from "axios";
import promotionQuery from "queries/promotion";

export default async () => {
	const {
		data: {
			data: {
				node: { promotion }
			}
		}
	} = await axios.post(
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
	);

	return promotion;
};
