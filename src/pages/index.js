import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { getBrowserLocale } from "helpers/locale";

export default () => {
	useEffect(() => {
		Router.replace("/[lang]", `/${getBrowserLocale()}/`);
	}, []);

	return (
		<Head>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	);
};
