import { Wrapper, Actions, Cart, CartItems } from "./styles";
import {
	AvatarIcon,
	HeartIcon,
	CartIcon,
	MenuIcon
} from "components/common/Icons";
import Search from "components/theme/Header/components/Search";
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
				<button
					type="button"
					onClick={() => toggleSidebar({ type: "OPEN_SIDEBAR", cart: true })}
				>
					<Cart>
						<CartIcon />
						{state.data && state.data.length > 0 && (
							<CartItems>{state.data.length}</CartItems>
						)}
					</Cart>
				</button>
				<button
					type="button"
					onClick={() => toggleSidebar({ type: "OPEN_SIDEBAR", cart: false })}
				>
					<MenuIcon />
				</button>
			</Actions>
		</Wrapper>
	);
};

export default Buttons;
