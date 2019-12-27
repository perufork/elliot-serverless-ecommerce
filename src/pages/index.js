import Layout from "components/common/Layout";
import Products from "components/listing/Products";
import fetch from "isomorphic-unfetch";

const Index = ({ products }) => (
	<Layout>
		<Products products={products} />
	</Layout>
);

Index.getInitialProps = async () => {
	const response = await fetch("http://localhost:3000/api/product");
	const products = await response.json();

	return { products };
};

export default Index;
