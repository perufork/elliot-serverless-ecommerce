import { Flex, Item } from "react-flex-ready";
import Container from "components/common/Container";
import { Wrapper } from "./styles";
import ProductCard from "components/common/ProductCard";

export default ({ products }) => (
	<Wrapper as={Container}>
		<Flex col={12} colTablet={12} colMobile={12}>
			{products.map((product, i) => (
				<Item key={i} col={12} colTablet={12} colMobile={12} stretch>
					<ProductCard {...product} />
				</Item>
			))}
		</Flex>
	</Wrapper>
);
