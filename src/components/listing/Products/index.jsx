import { Flex, Item } from "react-flex-ready";
import Container from "components/common/Container";
import { Wrapper } from "./styles";
import ProductCard from "components/common/ProductCard";
import { useDispatchCart } from "providers/CartProvider";
import { addToCart } from "components/listing/actions";
import { useDispatchSidebar } from "providers/SidebarProvider";

export default ({ products }) => {
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();

	return (
		<Wrapper as={Container}>
			<Flex col={12} colTablet={12} colMobile={12}>
				{products.map((product, i) => (
					<Item key={i} col={12} colTablet={12} colMobile={12} stretch>
						<ProductCard
							onClick={() => {
								addToCart({ dispatch, payload: product });
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							{...product}
						/>
					</Item>
				))}
			</Flex>
		</Wrapper>
	);
};
