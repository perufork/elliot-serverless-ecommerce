import PageTitle from "components/common/PageTitle";
import ShoppingCart from "components/cart/components/ShoppingCart";

const breadcumbs = [
	{
		name: "Shop",
		link: "/"
	},
	{
		name: "Cart",
		link: "/cart/",
		active: true
	}
];

const Items = () => {
	return (
		<>
			<PageTitle title="title.cart" breadcumbs={breadcumbs} />
			<ShoppingCart />
		</>
	);
};

export default Items;
