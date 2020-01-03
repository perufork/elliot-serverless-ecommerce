import { Wrapper, Search, Form, Actions, Cart, CartItems } from "./styles";
import CartIcon from "components/common/CartIcon";
import Link from "next/link";

const Buttons = ({ toggleSidebar }) => (
	<Wrapper>
		<Search>
			<Form>
				<input type="text" placeholder="Search Searching..." />
				<button>
					<CartIcon />
				</button>
			</Form>
		</Search>
		<Actions>
			<Link href="/">
				<a>
					<CartIcon />
				</a>
			</Link>
			<Link href="/">
				<a>
					<CartIcon />
				</a>
			</Link>
			<Link href="/">
				<Cart>
					<CartIcon />
					<CartItems>2</CartItems>
				</Cart>
			</Link>
			<button onClick={() => toggleSidebar(true)}>
				<CartIcon />
			</button>
		</Actions>
	</Wrapper>
);

export default Buttons;
