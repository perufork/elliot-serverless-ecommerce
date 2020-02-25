import { useState } from "react";
import { useIntl } from "react-intl";
import { FiltersWrapper, Header, Products, Result, Filters } from "./styles";
import Container from "components/common/Container";
import PageTitle from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import ShowMore from "components/common/ShowMore";
import { GridIcon, ListIcon } from "components/common/Icons";
import ProductCard from "components/common/ProductCard";
import { useDispatchCart, useCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addQuantityByProduct, addToCart } from "components/cart/actions";

export default ({ products, collection }) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const [grid, setGrid] = useState(true);
	const { locale } = useIntl();

	return (
		<Container>
			<Header>
				<PageTitle
					title="shop.page.title"
					breadcrumbs={
						collection
							? [
									{
										name: "Shop",
										link: `/[lang]/`,
										as: `/${locale}`,
										active: false
									},
									{
										name: collection.name,
										link: `/[lang]/collection/[slug]`,
										as: `/${locale}/collection/${collection.slug}`,
										active: true
									}
							  ]
							: [
									{
										name: "Shop",
										link: `/[lang]/`,
										as: `/${locale}`,
										active: false
									}
							  ]
					}
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
				{products?.edges.map(({ node }, i) => {
					const product =
						state.data && state.data.find(item => item.id === node.id);
					return (
						<ProductCard
							key={i}
							onClick={() => {
								if (product && product.quantity >= 1) {
									addQuantityByProduct({ dispatch, id: product.id });
								} else {
									addToCart({ dispatch, payload: { ...node, quantity: 1 } });
								}
								dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
							}}
							grid={grid}
							{...node}
						/>
					);
				})}
			</Products>
			<ShowMore />
		</Container>
	);
};
