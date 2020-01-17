import { Wrapper } from "./styles";
import Breadcrumbs from "components/common/Breadcrumbs";
import { useIntl } from "react-intl";

const BreadcumbsHeader = ({ id, title }) => {
	const { locale } = useIntl();

	return (
		<Wrapper>
			<Breadcrumbs
				flexAlign="start"
				links={[
					{
						name: "Shop",
						link: `/${locale}/`,
						as: `/${locale}/`
					},
					{
						name: title,
						link: `/${locale}/product?id=${id}`,
						as: `/${locale}/product/${id}`,
						active: true
					}
				]}
			/>
		</Wrapper>
	);
};

export default BreadcumbsHeader;
