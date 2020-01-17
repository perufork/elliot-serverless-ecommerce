import Link from "next/link";
import { Card, CardHeader, CardFooter } from "./styles";
import { useIntl } from "react-intl";

export default ({ product: { id, price, name } }) => {
	const { locale } = useIntl();
	return (
		<Card>
			<CardHeader>
				<Link
					href={`/${locale}/product?id=${id}`}
					as={`/${locale}/product/${id}`}
				>
					<a>{name}</a>
				</Link>
			</CardHeader>
			<CardFooter>
				<span>${price}</span>
			</CardFooter>
		</Card>
	);
};
