import { useState } from "react";
import { useIntl } from "react-intl";
import { FiltersWrapper, Header, Products, Result, Filters } from "./styles";
import Container from "components/common/Container";
import PageTitle from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import { GridIcon, ListIcon } from "components/common/Icons";
import ProductCard from "components/common/ProductCard";
import { useDispatchCart, useCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addToCart } from "components/listing/actions";
import { addQuantityByProduct } from "components/cart/actions";

export default ({ products }) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const [grid, setGrid] = useState(true);
	const { locale } = useIntl();

	return (
		<Container>
			<Header>
				<PageTitle
					title="Shop"
					breadcrumbs={[
						{
							name: "Home",
							link: `/${locale}`,
							as: `/${locale}`
						},
						{
							name: "Shop",
							link: `/${locale}`,
							as: `/${locale}`,
							active: true
						}
					]}
				/>

				<FiltersWrapper>
					<Result>
						<span>{(products && products.edges.length) || 0}</span>
						Products Found
					</Result>
					<Filters>
						<Dropdown
							label="Sort by"
							options={["Default", "Average Rating", "Newest", "Oldest"]}
							displayDefaultValue
						/>

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
					</Filters>
				</FiltersWrapper>
			</Header>
			<Products grid={grid}>
				{products.edges.map(({ node }, i) => {
					const product =
						state.data && state.data.find(item => item.id === node.id);
					return (
						<ProductCard
							key={i}
							onClick={() => {
								if (product && product.quantity >= 1) {
									addQuantityByProduct({ dispatch, id: product.id });
								} else {
									addToCart({ dispatch, payload: node });
								}
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							grid={grid}
							{...node}
						/>
					);
				})}
			</Products>
		</Container>
	);
};
