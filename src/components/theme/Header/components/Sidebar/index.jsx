import NavigationLinks from "components/theme/Header/components/NavigationLinks";
import CartSidebar from "components/theme/Header/components/CartSidebar";
import { Wrapper, Burger, Close, Nav, Overlay, Content } from "./styles";

export default ({ visibleSidebar, toggleSidebar, showCartContent }) => (
	<Wrapper>
		<Overlay
			visible={visibleSidebar}
			onClick={() => toggleSidebar({ type: "CLOSE_SIDEBAR", cart: false })}
		/>
		<Nav visible={visibleSidebar}>
			<Burger>
				<Close
					onClick={() => toggleSidebar({ type: "CLOSE_SIDEBAR", cart: false })}
				/>
			</Burger>
			<Content>
				{showCartContent ? (
					<CartSidebar
						toggleSidebar={() =>
							toggleSidebar({ type: "CLOSE_SIDEBAR", cart: false })
						}
					/>
				) : (
					<NavigationLinks
						toggleSidebar={() =>
							toggleSidebar({ type: "CLOSE_SIDEBAR", cart: false })
						}
					/>
				)}
			</Content>
		</Nav>
	</Wrapper>
);
