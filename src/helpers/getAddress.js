import axios from "axios";
import addressQuery from "queries/address";

export default async () => {
	const {
		data: {
			data: {
				node: {
					domain: {
						company: { address }
					}
				}
			}
		}
	} = await axios.post(
		process.env.ELLIOT_API,
		{
			query: addressQuery,
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

	return address;
};
