import Link from "next/link";
import { ShowMore } from "./styles";

export default () => (
	<ShowMore className="show-more">
		<Link href="#">
			<a>Discover More</a>
		</Link>
	</ShowMore>
);
