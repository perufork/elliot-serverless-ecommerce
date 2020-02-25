import { useState } from "react";
import { useIntl } from "react-intl";
import { FiltersWrapper, Header, Products, Result, Filters } from "./styles";
import Container from "components/common/Container";
import PageTitle from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import ShowMore from "components/common/ShowMore";
import { GridIcon, ListIcon } from "components/common/Icons";
import ProductCard from "components/common/ProductCard";
import { addToCart } from "components/listing/actions";
import { useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";

export default ({ products }) => {
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
						<span>25</span>
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
				{products?.edges?.map(({ node }, i) => (
					<ProductCard
						key={i}
						onClick={() => {
							addToCart({ dispatch, payload: node });
							dispatchSidebar({ type: "OPEN_SIDEBAR", cartContent: true });
						}}
						grid={grid}
						{...node}
					/>
				))}
			</Products>
			<ShowMore />
		</Container>
	);
};
