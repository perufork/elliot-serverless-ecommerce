import axios from "axios";
import buildCache from "helpers/buildtime/buildCache";
import productBySlugQuery from "queries/productBySlug";
import { ELLIOT_API_KEY, ELLIOT_DOMAIN_ID, ENVIRONMENT } from "config";

export default async (slug, preview) => {
	if (preview) {
		const { data } = await axios.post(
			ENVIRONMENT === "staging"
				? "https://cors-anywhere.herokuapp.com/https://admin.elliot.store/api"
				: "https://admin.elliot.store/api",
			{
				query: productBySlugQuery,
				variables: {
					slug,
					domainId: ELLIOT_DOMAIN_ID
				}
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					KEY: `KEY ${ELLIOT_API_KEY}`,
					origin: "http://localhost:3001"
				}
			}
		);
		return data.data.node.products.edges[0].node;
	}
	return buildCache("getProductBySlug", () =>
		axios
			.post(
				"https://admin.elliot.store/api ",
				{
					query: productBySlugQuery,
					variables: {
						slug,
						domainId: ELLIOT_DOMAIN_ID
					}
				},
				{
					headers: {
						"Content-Type": "application/json",
						KEY: `KEY ${ELLIOT_API_KEY}`
					}
				}
			)
			.then(res => res.data.data.node.products.edges[0].node)
	);
};
