import axios from "axios";
import legalQuery from "queries/legal";

export default async () => {
	const {
		data: {
			data: {
				node: {
					domain: { company }
				}
			}
		}
	} = await axios.post(
		process.env.ELLIOT_API,
		{
			query: legalQuery,
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

	return company;
};
