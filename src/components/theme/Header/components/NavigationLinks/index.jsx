import Link from "next/link";
import { useIntl } from "react-intl";
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
		code: "en"
	},
	{
		title: "French",
		code: "fr"
	}
];

const NavigationLinks = ({ toggleSidebar }) => {
	const { locale } = useIntl();

	return (
		<Navigation>
			<Options>
				<List>
					{Languages.map(({ title, code }, i) => (
						<li key={i}>
							<Link href="/[lang]/" as={`/${code}/`}>
								<a
									className={code === locale ? "active" : 0}
									onClick={toggleSidebar}
								>
									{title}
								</a>
							</Link>
						</li>
					))}
				</List>
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
			</Options>
			<Menu>
				<DesktopMenu>
					{["Shop", "Collection", "Contact"].map((item, i) => (
						<li key={i}>
							<Link href="/en/" as="/en/">
								<a className={i === 0 ? "active" : 0} onClick={toggleSidebar}>
									{item}
								</a>
							</Link>
						</li>
					))}
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
	);
};

export default NavigationLinks;
