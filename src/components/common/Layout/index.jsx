import Header from "components/theme/Header";
import { withTheme } from "styled-components";
import GlobalStyle from "components/theme/global-style";
import Head from "next/head";
import { Wrapper } from "./styles";

const Layout = ({ children, collections, theme }) => (
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
			<Header collections={collections} />
			<Wrapper>{children}</Wrapper>
		</>
	</>
);

export default withTheme(Layout);
