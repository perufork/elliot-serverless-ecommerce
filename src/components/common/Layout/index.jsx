import Header from "components/theme/Header";
import GlobalStyle from "components/theme/global-style";
import Head from "next/head";
import Sidebar from "components/theme/Sidebar";

export default ({ children }) => (
	<>
		<Head>
			{/* TODO: pass custom font from theme */}
			<link
				href="https://fonts.googleapis.com/css?family=Roboto&display=fallback"
				rel="stylesheet"
			/>
		</Head>
		<GlobalStyle />
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	</>
);
