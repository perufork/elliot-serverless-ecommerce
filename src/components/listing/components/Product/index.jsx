import Link from "next/link";
import { Card, CardHeader, CardFooter } from "./styles";

export default ({ product: { id, price, name } }) => (
	<Card>
		<CardHeader>
			<Link href={`/product?id=${id}`}>
				<a>{name}</a>
			</Link>
		</CardHeader>
		<CardFooter>
			<span>${price}</span>
		</CardFooter>
	</Card>
);
