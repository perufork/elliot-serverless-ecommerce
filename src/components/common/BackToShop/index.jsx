import Link from "next/link";
import { useIntl } from "react-intl";
import Button from "components/common/Button";
import { Wrapper } from "./styles";

export default ({ title }) => {
	const { locale } = useIntl();

	return (
		<Wrapper>
			<h2>{title}</h2>
			<Link href="/[lang]/" as={`/${locale}/`}>
				<Button as="a" variant="primary">
					Back to Shop
				</Button>
			</Link>
		</Wrapper>
	);
};
