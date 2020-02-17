import { Menu, InnerMenu } from "./styles";
import Link from "next/link";
import { useIntl } from "react-intl";

const Links = ({ collections }) => {
	const { locale } = useIntl();
	console.log(collections);

	return (
		<Menu>
			{["Home", "Shop", "Collection", "Contact"].map((item, id) => (
				<li key={id}>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<a>{item}</a>
					</Link>
					<InnerMenu>
						{[
							"Inner Home",
							"Inner Shop",
							"Inner Collection",
							"Inner Pages",
							"Inner Blog",
							"Inner Contact"
						].map((item, i) => (
							<li key={i}>
								<Link href="/[lang]/" as={`/${locale}/`}>
									<a>{item}</a>
								</Link>
							</li>
						))}
					</InnerMenu>
				</li>
			))}
		</Menu>
	);
};

export default Links;
