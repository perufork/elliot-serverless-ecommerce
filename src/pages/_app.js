import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";
import { CartProvider } from "providers/CartProvider";
import { SidebarProvider } from "providers/SidebarProvider";
import { CurrencyProvider } from "providers/CurrencyProvider";
import "react-phone-input-2/lib/style.css";
import "swiper/css/swiper.css";

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<CurrencyProvider>
				<CartProvider>
					<SidebarProvider>
						<ThemeProvider theme={theme}>
							<Component {...pageProps} />
						</ThemeProvider>
					</SidebarProvider>
				</CartProvider>
			</CurrencyProvider>
		);
	}
}
