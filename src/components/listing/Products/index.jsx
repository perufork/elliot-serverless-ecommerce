import { Flex, Item } from "react-flex-ready";
import Container from "components/common/Container";
import Product from "components/listing/components/Product";
import { Wrapper } from "./styles";

export default ({ products }) => (
	<Wrapper as={Container}>
		<Flex col={4} colTablet={6} colMobile={12}>
			{products.map((p, i) => (
				<Item
					key={i}
					col={4}
					colTablet={6}
					colMobile={12}
					marginBottom={20}
					stretch
				>
					<Product product={p} />
				</Item>
			))}
		</Flex>
	</Wrapper>
);
