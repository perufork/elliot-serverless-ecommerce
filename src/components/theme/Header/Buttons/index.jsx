import { Wrapper, Actions, Cart, CartItems } from "./styles";
import {
	AvatarIcon,
	HeartIcon,
	CartIcon,
	MenuIcon
} from "components/common/Icons";
import Search from "components/theme/Header/Search";
import Link from "next/link";

const Buttons = ({ toggleSidebar }) => (
	<Wrapper>
		<Search />
		<Actions>
			<Link href="/">
				<a>
					<AvatarIcon />
				</a>
			</Link>
			<Link href="/favorite">
				<a>
					<HeartIcon />
				</a>
			</Link>
			<Link href="/">
				<Cart>
					<CartIcon />
					<CartItems>2</CartItems>
				</Cart>
			</Link>
			<button onClick={() => toggleSidebar(true)}>
				<MenuIcon />
			</button>
		</Actions>
	</Wrapper>
);

export default Buttons;
