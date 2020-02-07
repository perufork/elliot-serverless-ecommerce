import { useIntl } from "react-intl";
import { Flex, Item } from "react-flex-ready";
import PageTitle from "components/common/PageTitle";
import PaymentForm from "components/checkout/OrderCheckout/components/PaymentForm";
import Summary from "components/checkout/OrderCheckout/components/Summary";
import Container from "components/common/Container";
import BackToShop from "components/common/BackToShop";
import { useCart } from "providers/CartProvider";

const Items = () => {
	const { locale } = useIntl();
	const { state } = useCart();

	const breadcrumbs = [
		{
			name: "Shop",
			link: `/[lang]/`,
			as: `/${locale}/`
		},
		{
			name: "Checkout",
			link: `/[lang]/checkout/`,
			as: `/${locale}/checkout/`,
			active: true
		}
	];

	return (
		<>
			<PageTitle
				title="title.checkout"
				breadcrumbs={breadcrumbs}
				breadCrumbsAlign="center"
			/>
			{state.data && state.data.length > 0 ? (
				<Flex as={Container} align="flex-start">
					<Item col={6} colTablet={12} colMobile={12} gap={2}>
						<PaymentForm />
					</Item>
					<Item col={6} colTablet={12} colMobile={12} gap={2}>
						<Summary />
					</Item>
				</Flex>
			) : (
				<BackToShop title="No items to checkout" />
			)}
		</>
	);
};

export default Items;
