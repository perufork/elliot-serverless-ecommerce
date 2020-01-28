import { useState } from "react";
import { useIntl } from "react-intl";
import { Flex, Item } from "react-flex-ready";
import { Wrapper, Header, Heading } from "./styles";
import Container from "components/common/Container";
import { GridIcon, ListIcon } from "components/common/Icons";
import ProductCard from "components/common/ProductCard";
import { addToCart } from "components/listing/actions";
import Breadcrumbs from "components/common/Breadcrumbs";
import { useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";

export default ({ products }) => {
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const [grid, setGrid] = useState(true);
	const { locale } = useIntl();

	return (
		<Wrapper as={Container}>
			<Header>
				<Wrapper>
					<Heading>Shop</Heading>
					<Breadcrumbs
						flexAlign="flex-start"
						links={[
							{
								name: "Home",
								link: `/${locale}/product?id=`,
								as: `/${locale}/product/`
							},
							{
								name: "Shop",
								link: `/${locale}/`,
								as: `/${locale}/`,
								active: true
							}
						]}
					></Breadcrumbs>
				</Wrapper>

				<Wrapper>
					<button
						style={{ background: "none", border: "none" }}
						type="button"
						onClick={() => setGrid(!grid)}
					>
						{grid ? (
							<ListIcon width={20} height={20} />
						) : (
							<GridIcon width={20} height={20} />
						)}
					</button>
				</Wrapper>
			</Header>
			<Flex
				col={grid ? 3 : 12}
				colTablet={grid ? 3 : 12}
				colMobile={grid ? 6 : 12}
			>
				{products.edges.map(({ node }, i) => (
					<Item
						key={i}
						col={grid ? 3 : 12}
						colTablet={grid ? 3 : 12}
						colMobile={grid ? 6 : 12}
						marginBottom={30}
						stretch
					>
						<ProductCard
							onClick={() => {
								addToCart({ dispatch, payload: node });
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							grid={grid}
							{...node}
						/>
					</Item>
				))}
			</Flex>
		</Wrapper>
	);
};
