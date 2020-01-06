import React from "react";
import App from "next/app";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";
import { CartProvider } from "providers/CartProvider";
import { getLocale } from "helpers/locale";

const cache = createIntlCache();

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const { req } = ctx;

		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		// Get the `locale` and `messages` from the request object on the server.
		// In the browser, use the same values that the server serialized.
		const { locale, messages } = req || window.__NEXT_DATA__.props;

		const props = { pageProps, locale, messages };

		if (!props.locale) {
			props.locale = getLocale(req);
		}

		if (!props.messages) {
			const strings = (await import("lang/strings")).default;
			props.messages = strings[props.locale];
		}

		return props;
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
				<CartProvider>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</CartProvider>
			</RawIntlProvider>
		);
	}
}
