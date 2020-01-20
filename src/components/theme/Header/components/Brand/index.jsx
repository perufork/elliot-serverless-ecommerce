import Link from "next/link";
import Logo from "components/common/Logo";
import { useIntl } from "react-intl";

const Brand = () => {
	const { locale } = useIntl();

	return (
		<Link href="/[lang]/" as={`/${locale}/`}>
			<a>
				<Logo width={48} height={48} />
			</a>
		</Link>
	);
};

export default Brand;
