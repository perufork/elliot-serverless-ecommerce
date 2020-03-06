import { Wrapper, Actions, Cart, CartItems } from "./styles";
import {
	// AvatarIcon,
	// HeartIcon,
	CartIcon,
	MenuIcon,
	SearchIcon
} from "components/common/Icons";
// import Search from "components/theme/Header/components/Search";
// import Link from "next/link";
import { useCart } from "providers/CartProvider";
// import { useIntl } from "react-intl";

const Buttons = ({ toggleSidebar }) => {
	const { state } = useCart();
	// const { locale } = useIntl();

	return (
		<Wrapper>
			{/* <Search toggleSidebar={toggleSidebar} /> */}
			<Actions>
				<button
					aria-label="search"
					type="button"
					onClick={() =>
						toggleSidebar({ type: "OPEN_SIDEBAR", content: "search" })
					}
				>
					<SearchIcon width={20} height={20} />
				</button>
				{/* <Link href="/[lang]/" as={`/${locale}/`}>
					<a>
						<AvatarIcon width={20} height={20} />
					</a>
				</Link> */}
				{/* <Link href="/favorite">
					<a>
						<HeartIcon width={20} height={20} />
					</a>
				</Link> */}
				<button
					type="button"
					aria-label="cart"
					onClick={() =>
						toggleSidebar({ type: "OPEN_SIDEBAR", content: "cart" })
					}
				>
					<Cart>
						<CartIcon width={20} height={20} />
						{state?.data?.length > 0 && (
							<CartItems>{state.data.length}</CartItems>
						)}
					</Cart>
				</button>
				<button
					aria-label="menu"
					type="button"
					onClick={() => toggleSidebar({ type: "OPEN_SIDEBAR", content: "" })}
				>
					<MenuIcon width={20} height={20} />
				</button>
			</Actions>
		</Wrapper>
	);
};

export default Buttons;
