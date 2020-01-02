import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";

const cache = createIntlCache();

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		// Get the `locale` and `messages` from the request object on the server.
		// In the browser, use the same values that the server serialized.
		const { req } = ctx;
		const { locale, messages } = req || window.__NEXT_DATA__.props;

		return { pageProps, locale, messages };
	}

	render() {
		const { Component, pageProps, locale, messages } = this.props;

		const intl = createIntl(
			{
				locale,
				messages
			},
			cache
		);

		return (
			<RawIntlProvider value={intl}>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</RawIntlProvider>
		);
	}
}
