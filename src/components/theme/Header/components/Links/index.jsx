import { Menu } from "./styles";
import Link from "next/link";
import { useIntl } from "react-intl";

const Links = () => {
	const { locale } = useIntl();
	return (
		<div>
			<Menu>
				{["Home", "Shop", "Collection", "Contact"].map((item, id) => (
					<li key={id}>
						<Link href={`/${locale}/`} as={`/${locale}/`}>
							<a>{item}</a>
						</Link>
					</li>
				))}
			</Menu>
		</div>
	);
};

export default Links;
