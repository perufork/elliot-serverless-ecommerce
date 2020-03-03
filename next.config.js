const path = require("path");
const withImages = require("next-images");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});
module.exports = withImages({
	env: {
		BASE_URL: process.env.BASE_URL,
		ELLIOT_API: process.env.ELLIOT_API,
		ELLIOT_BASE_IMAGE_URL: process.env.ELLIOT_BASE_IMAGE_URL,
		ELLIOT_API_KEY: process.env.ELLIOT_API_KEY,
		ELLIOT_STORE_FRONT_ID: process.env.ELLIOT_STORE_FRONT_ID,
		STRIPE_API_PUBLISHABLE_KEY_TEST:
			process.env.STRIPE_API_PUBLISHABLE_KEY_TEST,
		ELLIOT_CREATE_ORDER_SELF_CHECKOUT_FUNCTION_URL:
			process.env.ELLIOT_CREATE_ORDER_SELF_CHECKOUT_FUNCTION_URL,
		PLACES_API_KEY: process.env.PLACES_API_KEY,
		ELLIOT_DOMAIN_ID: process.env.ELLIOT_DOMAIN_ID,
		ELLIOT_ALGOLIA_APP_ID: process.env.ELLIOT_ALGOLIA_APP_ID,
		ELLIOT_ALGOLIA_API_KEY: process.env.ELLIOT_ALGOLIA_API_KEY,
		ENVIRONMENT: process.env.ENVIRONMENT,
		ELLIOT_STORE_FRONT_NAME: process.env.ELLIOT_STORE_FRONT_NAME,
		ELLIOT_EXCHANGE_RATES_URL: process.env.ELLIOT_EXCHANGE_RATES_URL
	},
	webpack: config => {
		if (config.resolve.modules)
			config.resolve.modules.unshift(path.resolve(__dirname, "src"));
		return config;
	},
	experimental: {
		async rewrites() {
			return [
				{
					source: "/",
					destination: "/index.html"
				}
			];
		}
	}
	// experimental: {
	//  async headers() {
	//    return [
	//      {
	//        source: "/",
	//        headers: []
	//      }
	//    ];
	//  }
	// }
});
