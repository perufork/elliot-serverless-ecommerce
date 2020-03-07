import axios from "axios";
import checkoutQuery from "queries/checkout";

export default async () => {
	const {
		data: {
			data: { node: checkout }
		}
	} = await axios.post(
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
	);

	return checkout;
};
