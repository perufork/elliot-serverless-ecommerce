import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { IntlProvider } from "react-intl";
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

			pageProps.lang = IntlProvider.defaultProps.defaultLocale;
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
			<Html lang={this.props.lang}>
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
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
						integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
						crossOrigin="anonymous"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
