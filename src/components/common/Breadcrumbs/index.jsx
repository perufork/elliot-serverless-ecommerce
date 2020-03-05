import { FormattedMessage } from "react-intl";
import { Fragment } from "react";
import Link from "next/link";
import { Flex, Item } from "./styles";

const Breadcrumbs = ({ links, flexAlign }) => (
	<Flex flexAlign={flexAlign}>
		{links.map(({ active, link, as, name }, id) => (
			<Fragment key={id}>
				{active ? (
					<Item active as="span">
						<FormattedMessage id={name} />
					</Item>
				) : (
					<Link href={link} as={as} key={id}>
						<Item as="a">
							<FormattedMessage id={name} />
						</Item>
					</Link>
				)}
			</Fragment>
		))}
	</Flex>
);

export default Breadcrumbs;
