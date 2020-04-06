import axios from "axios";
import productByIdQuery from "queries/productById";
import { ELLIOT_API_KEY } from "config";

export default async id => {
	const {
		data: {
			data: { node }
		}
	} = await axios.post(
		"https://cors-anywhere.herokuapp.com/https://admin.elliot.store/api ",
		{
			query: productByIdQuery,
			variables: {
				productId: id
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

	return node;
};
