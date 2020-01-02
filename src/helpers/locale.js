// Combines the other two utility functions
export const getLocale = (req, defaultLocale) => {
	if (req) {
		return getServerLocale(req, defaultLocale);
	} else {
		return getBrowserLocale(defaultLocale);
	}
};

export const getServerLocale = (req, defaultLocale) => {
	const accepts = require("accepts");
	const accept = accepts(req);
	return accept.languages()[0].split("-")[0] || defaultLocale || "en";
};

export const getBrowserLocale = defaultLocale => {
	if (navigator.languages != undefined) {
		return navigator.languages[0].split("-")[0] || defaultLocale || "en";
	} else {
		return navigator.language || defaultLocale || "en";
	}
};
