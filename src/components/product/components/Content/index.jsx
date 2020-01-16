import { Flex, Item } from "react-flex-ready";
import Carousel from "components/product/components/Carousel";
import Details from "components/product/components/Details";
import { Wrapper } from "./styles";

const Content = ({ title, ...props }) => (
	<Wrapper as={Flex} align="start">
		<Item col={6} colTablet={12} colMobile={12} gap={2}>
			<Carousel title={title} />
		</Item>
		<Item col={6} colTablet={12} colMobile={12} gap={2}>
			<Details {...props} />
		</Item>
	</Wrapper>
);

export default Content;
