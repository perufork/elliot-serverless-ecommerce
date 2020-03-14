import { FormattedMessage } from "react-intl";
import { Title, Wrapper } from "./styles";
import Breadcrumbs from "components/common/Breadcrumbs";

const PageTitle = ({ title, breadcrumbs, breadCrumbsAlign = "start" }) => (
	<Wrapper>
		<Title>
			<FormattedMessage id={title} />
		</Title>
		{breadcrumbs && (
			<Breadcrumbs flexAlign={breadCrumbsAlign} links={breadcrumbs} />
		)}
	</Wrapper>
);

export default PageTitle;
