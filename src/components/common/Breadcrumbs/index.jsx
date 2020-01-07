import { Fragment } from "react";
import Link from "next/link";
import { Flex, Item } from "./styles";

const Breadcrumbs = ({ links }) => (
	<Flex>
		{links.map(({ active, link, name }, id) => (
			<Fragment key={id}>
				{active ? (
					<Item active as="span">
						{name}
					</Item>
				) : (
					<Link href={link} key={id}>
						<Item as="a">{name}</Item>
					</Link>
				)}
			</Fragment>
		))}
	</Flex>
);

export default Breadcrumbs;
