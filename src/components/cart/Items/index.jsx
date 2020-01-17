import PageTitle from "components/common/PageTitle";
import ShoppingCart from "components/cart/components/ShoppingCart";
import { useIntl } from "react-intl";

const Items = () => {
	const { locale } = useIntl();

	const breadcumbs = [
		{
			name: "Shop",
			link: `/${locale}/`,
			as: `/${locale}/`
		},
		{
			name: "Cart",
			link: `/${locale}/cart/`,
			as: `/${locale}/cart/`,
			active: true
		}
	];
	return (
		<>
			<PageTitle title="title.cart" breadcumbs={breadcumbs} />
			<ShoppingCart />
		</>
	);
};

export default Items;
