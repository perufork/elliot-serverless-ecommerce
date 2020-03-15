import Link from "next/link";
import { useIntl } from "react-intl";
import { useCurrency } from "providers/CurrencyProvider";
import languages from "helpers/languages";
import currencies from "helpers/currencies.json";
import Dropdown from "components/common/Dropdown";
import {
	Navigation,
	Menu,
	DesktopMenu,
	Options,
	MenuBottom,
	List
} from "./styles";

const NavigationLinks = ({ toggleSidebar, checkout }) => {
	const { state: currency, setState: setCurrency } = useCurrency();
	const { locale } = useIntl();

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
					<li>
						<Link href="/en/" as="/en/">
							<a onClick={toggleSidebar}>Shop</a>
						</Link>
					</li>
					<li>
						<Link href="/[lang]/about" as={`/${locale}/about`}>
							<a onClick={toggleSidebar}>About us</a>
						</Link>
					</li>
				</DesktopMenu>
			</Menu>
			{checkout?.domain?.company?.address?.address1 && (
				<MenuBottom>
					<figcaption>Contact Us</figcaption>
					<p>
						{checkout?.domain?.company?.address.address1},{" "}
						{checkout?.domain?.company?.address.city},{" "}
						{checkout?.domain?.company?.address.country},{" "}
						{checkout?.domain?.company?.address.zipCode},{" "}
						{checkout?.domain?.company?.address.email},{" "}
						{checkout?.domain?.company?.address.phoneNumber}
					</p>
				</MenuBottom>
			)}
		</Navigation>
	);
};

export default NavigationLinks;
