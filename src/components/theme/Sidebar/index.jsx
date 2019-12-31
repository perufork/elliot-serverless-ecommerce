import { useState } from "react";
import Link from "next/link";
import {
	Wrapper,
	Burger,
	Bar,
	Nav,
	Overlay,
	Content,
	Navigation,
	Menu,
	DesktopMenu,
	Options,
	MenuBottom,
	List
} from "./styles";
import { Flex, Item } from "react-flex-ready";

export default () => {
	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<Wrapper>
			<Overlay visible={showSidebar} />
			<Nav visible={showSidebar}>
				<Burger>
					<Bar onClick={() => setShowSidebar(!showSidebar)} />
				</Burger>
				<Content>
					<Navigation>
						<Options>
							<Flex>
								<Item col={6} colTablet={12} colMobile={12} marginBottom={20}>
									<List>
										{["English", "Italian", "German", "French"].map(
											(item, i) => (
												<li key={i}>
													<Link href="/" as="/">
														<a className={i === 0 ? "active" : 0}>{item}</a>
													</Link>
												</li>
											)
										)}
									</List>
								</Item>
								<Item col={6} colTablet={12} colMobile={12} marginBottom={20}>
									<List>
										{["USD", "GPB"].map((item, i) => (
											<li key={i}>
												<Link href="/" as="/">
													<a className={i === 0 ? "active" : 0}>{item}</a>
												</Link>
											</li>
										))}
									</List>
								</Item>
							</Flex>
						</Options>
						<Menu>
							<DesktopMenu>
								{["Home", "Shop", "Collection", "Pages", "Blog", "Contact"].map(
									(item, i) => (
										<li key={i}>
											<Link href="/" as="/">
												<a className={i === 0 ? "active" : 0}>{item}</a>
											</Link>
										</li>
									)
								)}
							</DesktopMenu>
						</Menu>
						<MenuBottom>
							<figcaption>Contact Us</figcaption>
							<p>
								69 Halsey St, Ny 10002, New York, United States
								support.center@unero.co (0091) 8547 632521
							</p>
						</MenuBottom>
					</Navigation>
				</Content>
			</Nav>
		</Wrapper>
	);
};
