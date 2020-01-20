import Layout from "components/common/Layout";
import Items from "components/cart/Items";
import withLocale from "hoc/withLocale";

const Cart = () => (
	<Layout>
		<Items />
	</Layout>
);

export const unstable_getStaticProps = ({ params }) => {
	return {
		props: {
			locale: params.lang
		}
	};
};

export default withLocale(Cart);
