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
		ELLIOT_API_TOKEN: process.env.ELLIOT_API_KEY,
		ELLIOT_STORE_FRONT_ID: process.env.ELLIOT_STORE_FRONT_ID
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
