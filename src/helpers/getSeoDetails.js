import axios from "axios";
import seoQuery from "queries/seo";

export default async () => {
	const {
		data: {
			data: { node }
		}
	} = await axios.post(
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
	);

	return node;
};
