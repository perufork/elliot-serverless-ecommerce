import axios from "axios";
import defaultCurrencyQuery from "queries/defaultCurrency";
import { ELLIOT_STORE_FRONT_ID, ELLIOT_API_KEY } from "config";

export default async () => {
	const {
		data: {
			data: {
				node: {
					domain: {
						company: { currency }
					}
				}
			}
		}
	} = await axios.post(
		"https://cors-anywhere.herokuapp.com/https://admin.elliot.store/api ",
		{
			query: defaultCurrencyQuery,
			variables: {
				id: ELLIOT_STORE_FRONT_ID
			}
		},
		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				KEY: `KEY ${ELLIOT_API_KEY}`
			}
		}
	);

	return currency;
};
