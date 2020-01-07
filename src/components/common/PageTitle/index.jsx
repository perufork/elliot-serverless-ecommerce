import { FormattedMessage } from "react-intl";
import { Title, Wrapper } from "./styles";
import Breadcrumbs from "components/common/Breadcrumbs";

const PageTitle = ({ title, breadcumbs }) => (
	<Wrapper>
		<Title>
			<FormattedMessage id={title} />
		</Title>
		{breadcumbs && <Breadcrumbs links={breadcumbs} />}
	</Wrapper>
);

export default PageTitle;
