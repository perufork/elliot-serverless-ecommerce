import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "components/theme";
import { CartProvider } from "providers/CartProvider";
import { SidebarProvider } from "providers/SidebarProvider";
import Loader from "components/common/Loader/Index";

export default class MyApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.timerHandle = setTimeout(() => this.setState({ loading: false }), 250);
	}

	componentWillUnmount() {
		if (this.timerHandle) {
			clearTimeout(this.timerHandle);
			this.timerHandle = 0;
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<CartProvider>
				<SidebarProvider>
					<ThemeProvider theme={theme}>
						<Loader isLoading={this.state.loading} />
						<Component {...pageProps} />
					</ThemeProvider>
				</SidebarProvider>
			</CartProvider>
		);
	}
}
