import fetch from "isomorphic-unfetch";
import Layout from "components/common/Layout";
import Container from "components/common/Container";

const Product = ({ data, status }) => (
	<Layout>
		<Container>
			{status === 200 ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{data.name}</td>
							<td>{data.price}</td>
							<td>{data.quantity}</td>
						</tr>
					</tbody>
				</table>
			) : (
				<p>{data.message}</p>
			)}
		</Container>
	</Layout>
);

Product.getInitialProps = async ({ query }) => {
	const response = await fetch(`http://localhost:3000/api/product/${query.id}`);

	const data = await response.json();
	return { data, status: response.status };
};

export default Product;
