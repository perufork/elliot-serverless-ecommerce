import { Menu } from "./styles";
import Link from "next/link";
import { useIntl } from "react-intl";

const Links = () => {
	const { locale } = useIntl();
	return (
		<Menu>
			{["Home", "Shop", "Collection", "Contact"].map((item, id) => (
				<li key={id}>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<a>{item}</a>
					</Link>
				</li>
			))}
		</Menu>
	);
};

export default Links;
