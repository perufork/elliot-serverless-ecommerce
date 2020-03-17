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
			{collections && collections.edges && (
				<li>
					<Link
						href="/[lang]/collection/[slug]"
						as={`/${locale}/collection/${
							collections.edges.filter(
								({ node: { products } }) => products?.edges?.length > 0
							)[0].node.slug
						}`}
					>
						<a>Collections</a>
					</Link>

					<InnerMenu>
						{collections.edges
							.filter(({ node: { products } }) => products?.edges?.length > 0)
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
				</li>
			)}
		</Menu>
	);
};

export default Links;
