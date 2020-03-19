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
import { addQuantityByProduct, addToCart } from "components/cart/actions";

export default ({ products, collection }) => {
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const [grid, setGrid] = useState(true);
	const { locale, formatMessage } = useIntl();

	const handleCart = (node, item) => {
		if (item?.quantity >= 1) {
			addQuantityByProduct({
				dispatch,
				id: item.product.id,
				skuId: item.sku.id
			});
		} else {
			addToCart({
				dispatch,
				payload: {
					product: node,
					quantity: 1,
					sku: node.skus?.edges[0]?.node
				}
			});
		}
		dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
	};

	return (
		<Container>
			<Header>
				<PageTitle
					title="shop.page.title"
					breadcrumbs={
						collection
							? [
									{
										name: "shop.page.title",
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
										name: "shop.page.title",
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
						{formatMessage({ id: "products.found" })}
					</Result>
					<Filters>
						<Dropdown
							label={formatMessage({ id: "dropdown.sort_by" })}
							options={[
								formatMessage({ id: "dropdown.sort_by.default" }),
								formatMessage({ id: "dropdown.sort_by.average_rating" }),
								formatMessage({ id: "dropdown.sort_by.newest" }),
								formatMessage({ id: "dropdown.sort_by.oldest" })
							]}
							displayDefaultValue
						/>

						<button
							style={{ background: "none", border: "none" }}
							type="button"
							onClick={() => setGrid(!grid)}
							aria-label="Change the grid layout"
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
				{products?.edges?.map(({ node }, i) => {
					const item = state?.data?.find(
						({ product }) => product.id === node.id
					);

					return (
						<ProductCard
							key={i}
							onClick={() => handleCart(node, item)}
							grid={grid}
							{...node}
						/>
					);
				})}
			</Products>
		</Container>
	);
};
