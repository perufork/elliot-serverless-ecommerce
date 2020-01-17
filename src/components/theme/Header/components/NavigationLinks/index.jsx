import Link from "next/link";
import { Flex, Item } from "react-flex-ready";
import {
	Navigation,
	Menu,
	DesktopMenu,
	Options,
	MenuBottom,
	List
} from "./styles";

const Languages = [
	{
		title: "English",
		locale: "en"
	},
	{
		title: "Italian",
		locale: "it"
	},
	{
		title: "German",
		locale: "de"
	},
	{
		title: "French",
		locale: "fr"
	}
];

const NavigationLinks = ({ toggleSidebar }) => (
	<Navigation>
		<Options>
			<Flex>
				<Item col={6} colTablet={12} colMobile={12} marginBottom={20}>
					<List>
						{Languages.map(({ title, locale }, i) => (
							<li key={i}>
								<Link href={`/${locale}/`} as={`/${locale}/`}>
									<a className={i === 0 ? "active" : 0} onClick={toggleSidebar}>
										{title}
									</a>
								</Link>
							</li>
						))}
					</List>
				</Item>
				<Item col={6} colTablet={12} colMobile={12} marginBottom={20}>
					<List>
						{["USD", "GPB"].map((item, i) => (
							<li key={i}>
								<Link href="/" as="/">
									<a className={i === 0 ? "active" : 0} onClick={toggleSidebar}>
										{item}
									</a>
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
							<Link href="/en/" as="/en/">
								<a className={i === 0 ? "active" : 0} onClick={toggleSidebar}>
									{item}
								</a>
							</Link>
						</li>
					)
				)}
			</DesktopMenu>
		</Menu>
		<MenuBottom>
			<figcaption>Contact Us</figcaption>
			<p>
				69 Halsey St, Ny 10002, New York, United States support.center@unero.co
				(0091) 8547 632521
			</p>
		</MenuBottom>
	</Navigation>
);

export default NavigationLinks;
