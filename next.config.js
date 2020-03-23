const path = require("path");
const withImages = require("next-images");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});
module.exports = withImages({
	env: {
		BASE_URL: process.env.BASE_URL,
		ELLIOT_ENV_VARIABLES: process.env.ELLIOT_ENV_VARIABLES,
		ENVIRONMENT: process.env.ENVIRONMENT
	},
	webpack: (config, { isServer }) => {
		if (config.resolve.modules)
			config.resolve.modules.unshift(path.resolve(__dirname, "src"));

		if (isServer) {
			// we're in build mode so enable fs caching for data
			process.env.USE_BUILD_CACHE = "true";
		}
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
		},
		async redirects() {
			return [
				{
					source: "/:path+/",
					destination: "/:path+",
					permanent: false
				}
			];
		}
	}
});
