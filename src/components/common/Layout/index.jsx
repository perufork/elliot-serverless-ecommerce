import Head from "next/head";

import Header from "components/theme/Header";
import Footer from "components/theme/Footer";
import { withTheme } from "styled-components";
import GlobalStyle from "components/theme/global-style";
import { Wrapper } from "./styles";

const Layout = ({
	children,
	collections,
	theme,
	seoDetails,
	promotion,
	checkout
}) => {
	return (
		<>
			<Head>
				{/* TODO: pass custom font from theme */}
				<link
					href={`https://fonts.googleapis.com/css?family=${theme.fonts.primary.replace(
						" ",
						"+"
					)}:300,400,500|${theme.fonts.primary.replace(
						" ",
						"+"
					)}:400,700&display=fallback`}
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyle />
			<>
				<Header
					collections={collections}
					seoDetails={seoDetails}
					promotion={promotion}
					checkout={checkout}
				/>
				<Wrapper>{children}</Wrapper>
				<Footer collections={collections} seoDetails={seoDetails} />
			</>
		</>
	);
};

export default withTheme(Layout);
