const path = require("path");
const withImages = require("next-images");

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = withImages({
	env: {
		BASE_URL: process.env.BASE_URL
	},
	webpack: config => {
		config.resolve.modules = [path.resolve(__dirname, "src"), "node_modules"];
		return config;
	}
});
