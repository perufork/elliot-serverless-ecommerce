import PageTitle from "components/common/PageTitle";
import { useIntl } from "react-intl";
import ShoppingCart from "components/cart/components/ShoppingCart";
import Checkout from "components/cart/components/Checkout";
import { useCart } from "providers/CartProvider";

const Items = () => {
	const { locale } = useIntl();
	const { state } = useCart();

	const breadcumbs = [
		{
			name: "Shop",
			link: `/[lang]/`,
			as: `/${locale}/`
		},
		{
			name: "Cart",
			link: `/[lang]/cart/`,
			as: `/${locale}/cart/`,
			active: true
		}
	];
	return (
		<>
			<PageTitle title="title.cart" breadcumbs={breadcumbs} />
			<ShoppingCart />
			{state.data && state.data.length > 0 && <Checkout />}
		</>
	);
};

export default Items;
