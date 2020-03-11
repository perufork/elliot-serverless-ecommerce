import App from "next/app";
import { PageTransition } from "next-page-transitions";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";
import { CartProvider } from "providers/CartProvider";
import { SidebarProvider } from "providers/SidebarProvider";
import { CurrencyProvider } from "providers/CurrencyProvider";
import "react-phone-input-2/lib/style.css";
import "swiper/css/swiper.css";

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
				<PageTransition timeout={300} classNames="page-transition">
					<CurrencyProvider>
						<CartProvider>
							<SidebarProvider>
								<ThemeProvider theme={theme}>
									<Component {...pageProps} key={pageProps.route} />
								</ThemeProvider>
							</SidebarProvider>
						</CartProvider>
					</CurrencyProvider>
				</PageTransition>
				<style jsx global>{`
					.page-transition-enter {
						opacity: 0;
					}
					.page-transition-enter-active {
						opacity: 1;
						transition: opacity 300ms;
					}
					.page-transition-exit {
						opacity: 1;
					}
					.page-transition-exit-active {
						opacity: 0;
						transition: opacity 300ms;
					}
				`}</style>
			</>
		);
	}
}
