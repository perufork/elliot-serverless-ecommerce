import { useState } from "react";
import PageTitle from "components/common/PageTitle";
import { useIntl } from "react-intl";
import ShoppingCart from "components/cart/components/ShoppingCart";
import Checkout from "components/cart/components/Checkout";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { addCustomQuantityByProduct } from "../actions";

const Items = () => {
	const { locale } = useIntl();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const [quantities, setQuantities] = useState([]);

	const breadcrumbs = [
		{
			name: "shop.page.title",
			link: `/[lang]/`,
			as: `/${locale}/`
		},
		{
			name: "cart.page.title",
			link: `/[lang]/cart/`,
			as: `/${locale}/cart/`,
			active: true
		}
	];

	const handleQuantity = ({ skuId, quantity }) => {
		console.log({ skuId, quantity });
		const product = quantities.find(item => item.skuId === skuId);

		if (product) {
			setQuantities(
				quantities.map(item => {
					if (item.skuId === skuId) return { skuId, quantity };
					return item;
				})
			);
		} else {
			setQuantities([
				...quantities,
				{
					skuId,
					quantity
				}
			]);
		}
	};

	const handleSubmit = () => {
		quantities.forEach(({ quantity, skuId }) => {
			addCustomQuantityByProduct({ dispatch, quantity, skuId });
		});
	};

	return (
		<>
			<PageTitle
				title="title.cart"
				breadcrumbs={breadcrumbs}
				breadCrumbsAlign="center"
			/>
			<ShoppingCart handleQuantity={handleQuantity} quantities={quantities} />
			{state?.data?.length > 0 && <Checkout handleSubmit={handleSubmit} />}
		</>
	);
};

export default Items;
