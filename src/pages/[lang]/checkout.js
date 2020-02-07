import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import withLocale from "hoc/withLocale";

const Checkout = () => (
	<Layout>
		<OrderCheckout />
	</Layout>
);

export const unstable_getStaticProps = ({ params }) => ({
	props: {
		locale: params.lang
	}
});

export default withLocale(Checkout);
