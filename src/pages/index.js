import { useEffect } from "react";
// import { useRouter } from "next/dist/client/router";
import Head from "next/head";
// import { getBrowserLocale } from "helpers/locale";
import { useIntl } from "react-intl";

const Index = () => {
	// const Router = useRouter();
	const { locale } = useIntl();

	useEffect(() => {
		Router.replace("/[lang]", `/${locale}/`);
	}, []);

	return (
		<Head>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	);
};

export default Index;
