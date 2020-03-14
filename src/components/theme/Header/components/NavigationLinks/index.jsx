import Link from "next/link";
import { useIntl } from "react-intl";
import { useCurrency } from "providers/CurrencyProvider";
import languages from "helpers/languages";
import currencies from "helpers/currencies.json";
import Dropdown from "../../../../common/Dropdown";
import {
	Navigation,
	Menu,
	DesktopMenu,
	Options,
	MenuBottom,
	List
} from "./styles";

const NavigationLinks = ({ toggleSidebar }) => {
	const { state: currency, setState: setCurrency } = useCurrency();

	return (
		<Navigation>
			<Options>
				<List>
					<Dropdown
						standalone
						options={languages}
						displayDefaultValue
						languages
					/>
				</List>
				<List>
					<Dropdown
						standalone
						options={currencies}
						currency={currency}
						setCurrency={setCurrency}
						displayDefaultValue
					/>
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
