import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const pageProps = await super.getInitialProps(ctx);

		const styleSheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => pageProps =>
						styleSheet.collectStyles(<App {...pageProps} />)
				});

			pageProps.styles = (
				<>
					{pageProps.styles}
					{styleSheet.getStyleElement()}
				</>
			);
		} finally {
			styleSheet.seal();
		}

		return pageProps;
	}

	render() {
		return (
			<html>
				<Head>
					{/* <link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css"
					/> */}
					<script
						async
						src={`https://maps.googleapis.com/maps/api/js?key=${process.env.PLACES_API_KEY}&libraries=places`}
					/>
					<script async src="https://js.stripe.com/v3/" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
