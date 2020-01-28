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
						link: `/[lang]/`,
						as: `/${locale}/`
					},
					{
						name: title,
						link: `/[lang]/product/[id]`,
						as: `/${locale}/product/${id}`,
						active: true
					}
				]}
			/>
		</Wrapper>
	);
};

export default BreadcumbsHeader;
