import Link from "next/link";
import { useIntl } from "react-intl";
import { useCurrency } from "providers/CurrencyProvider";
import Dropdown from "components/common/Dropdown";
import Container from "components/common/Container";
import languages from "helpers/languages.json";
import currencies from "helpers/currencies.json";
import {
	CopyWrapper,
	Item,
	List,
	ListTitle,
	Navigation,
	Separator,
	Wrapper
} from "./styles";

const Footer = ({ collections }) => {
	const { locale } = useIntl();
	const { state: currency, setState: setCurrency } = useCurrency();

	return (
		<Wrapper>
			<Navigation>
				<List>
					<ListTitle>Help &amp; Information</ListTitle>
					<Item>
						<Link href="">
							<a>FAQs</a>
						</Link>
					</Item>
				</List>
				<List>
					<ListTitle>About Elliot</ListTitle>
					<Item>
						<Link href="">
							<a>About us</a>
						</Link>
					</Item>
				</List>
				<List>
					<ListTitle>Online Shop</ListTitle>
					{collections &&
						collections.edges
							.filter(({ node: { products } }) => products?.edges?.length > 0)
							.map(({ node: { id, name, slug } }) => (
								<Item key={id}>
									<Link
										href="/[lang]/collection/[slug]"
										as={`/${locale}/collection/${slug}`}
									>
										<a>{name}</a>
									</Link>
								</Item>
							))}
				</List>
				<List>
					<ListTitle>Language</ListTitle>
					<Dropdown
						standalone
						options={languages}
						displayDefaultValue
						languages
					/>
				</List>
				<List>
					<ListTitle>Currency</ListTitle>
					<Dropdown
						standalone
						options={currencies}
						currency={currency}
						setCurrency={setCurrency}
						displayDefaultValue
					/>
				</List>
			</Navigation>
			<Separator />
			<Container>
				<CopyWrapper>
					<p>
						© 2020 <span>Elliot.</span> All rights reserved.
					</p>
					<ul>
						<li>
							<Link href="">
								<a>Privacy Policy</a>
							</Link>
						</li>
						<li>
							<Link href="">
								<a>Terms of Use</a>
							</Link>
						</li>
					</ul>
				</CopyWrapper>
			</Container>
		</Wrapper>
	);
};

export default Footer;
