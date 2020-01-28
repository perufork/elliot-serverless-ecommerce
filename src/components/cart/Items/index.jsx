import PageTitle from "components/common/PageTitle";
import { useIntl } from "react-intl";
import ShoppingCart from "components/cart/components/ShoppingCart";
import Checkout from "components/cart/components/Checkout";

const Items = () => {
	const { locale } = useIntl();

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
			<Checkout />
		</>
	);
};

export default Items;
