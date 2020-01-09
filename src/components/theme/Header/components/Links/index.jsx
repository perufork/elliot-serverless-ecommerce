import { Menu } from "./styles";
import Link from "next/link";

const Links = () => (
	<div>
		<Menu>
			{["Home", "Shop", "Collection", "Contact"].map((item, id) => (
				<li key={id}>
					<Link href="/">
						<a>{item}</a>
					</Link>
				</li>
			))}
		</Menu>
	</div>
);

export default Links;
