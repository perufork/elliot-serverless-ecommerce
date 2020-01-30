import Link from "next/link";
import Logo from "components/common/Logo";
import { Wrapper } from "./styles";
import { useIntl } from "react-intl";

const Brand = () => {
	const { locale } = useIntl();

	return (
		<Link href="/[lang]/" as={`/${locale}/`}>
			<a>
				<Wrapper>
					<Logo width="100%" height="auto" />
				</Wrapper>
			</a>
		</Link>
	);
};

export default Brand;
