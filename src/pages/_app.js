import App from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";
import { CartProvider } from "providers/CartProvider";
import { SidebarProvider } from "providers/SidebarProvider";
import { CurrencyProvider } from "providers/CurrencyProvider";
import "react-phone-input-2/lib/style.css";
import "swiper/css/swiper.css";
import "nprogress/nprogress.css";
import { CheckoutProvider } from "providers/CheckoutProvider";

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<CurrencyProvider>
					<CartProvider>
						<SidebarProvider>
							<CheckoutProvider checkout={pageProps.checkout}>
								<ThemeProvider theme={theme}>
									<Component {...pageProps} />
								</ThemeProvider>
							</CheckoutProvider>
						</SidebarProvider>
					</CartProvider>
				</CurrencyProvider>
			</>
		);
	}
}
