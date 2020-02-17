import { useEffect } from "react";
// import { useRouter } from "next/dist/client/router";
import Head from "next/head";
// import { getBrowserLocale } from "helpers/locale";

const Index = () => {
	// const Router = useRouter();

	useEffect(() => {
		Router.replace("/[lang]", `/en/`);
	}, []);

	return (
		<Head>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	);
};

export default Index;
