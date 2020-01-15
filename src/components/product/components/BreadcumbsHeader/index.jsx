import { Wrapper } from "./styles";
import Breadcrumbs from "components/common/Breadcrumbs";

const BreadcumbsHeader = ({ id, title }) => (
	<Wrapper>
		<Breadcrumbs
			flexAlign="start"
			links={[
				{
					name: "Shop",
					link: "/",
					as: "/"
				},
				{
					name: title,
					link: `/product?id=${id}`,
					as: `/product/${id}`,
					active: true
				}
			]}
		/>
	</Wrapper>
);

export default BreadcumbsHeader;
