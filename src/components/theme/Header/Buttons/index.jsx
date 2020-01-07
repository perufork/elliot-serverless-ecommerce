import { Wrapper, Actions, Cart, CartItems } from "./styles";
import {
	AvatarIcon,
	HeartIcon,
	CartIcon,
	MenuIcon
} from "components/common/Icons";
import Search from "components/theme/Header/Search";
import Link from "next/link";
import { useCart } from "providers/CartProvider";

const Buttons = ({ toggleSidebar }) => {
	const { state } = useCart();

	return (
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
				<Link href="/cart">
					<Cart>
						<CartIcon />
						{state.data && state.data.length > 0 && (
							<CartItems>{state.data.length}</CartItems>
						)}
					</Cart>
				</Link>
				<button onClick={() => toggleSidebar(true)}>
					<MenuIcon />
				</button>
			</Actions>
		</Wrapper>
	);
};

export default Buttons;
