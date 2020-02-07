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
			process.env.ELLIOT_CREATE_ORDER_SELF_CHECKOUT_FUNCTION_URL
	},
	cssModules: false,
	cssLoaderOptions: {
		url: false
	},
	webpack: config => {
		config.resolve.modules = [path.resolve(__dirname, "src"), "node_modules"];
		return config;
	}
});
