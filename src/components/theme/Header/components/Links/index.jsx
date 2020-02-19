import { Menu, InnerMenu } from "./styles";
import Link from "next/link";
import { useIntl } from "react-intl";

const Links = ({ collections }) => {
	const { locale } = useIntl();

	return (
		<Menu>
			<li>
				<Link href="/[lang]/" as={`/${locale}/`}>
					<a>Shop</a>
				</Link>
			</li>
			<li>
				<Link
					href="/[lang]/collection/[slug]"
					as={`/${locale}/collection/all-12`}
				>
					<a>Collections</a>
				</Link>
				{collections && collections.edges && (
					<InnerMenu>
						{collections.edges
							.filter(({ node: { productCount } }) => productCount > 0)
							.map(({ node: { id, name, slug } }) => (
								<li key={id}>
									<Link
										href="/[lang]/collection/[slug]"
										as={`/${locale}/collection/${slug}`}
									>
										<a>{name}</a>
									</Link>
								</li>
							))}
					</InnerMenu>
				)}
			</li>
			<li>
				<Link href="/[lang]/" as={`/${locale}/`}>
					<a>Contact</a>
				</Link>
			</li>
		</Menu>
	);
};

export default Links;
