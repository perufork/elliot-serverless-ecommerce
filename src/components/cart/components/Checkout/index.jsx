import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { useCart } from "providers/CartProvider";
import Button from "components/common/Button";
import Container from "components/common/Container";
import Coupon from "components/cart/components/Coupon";
import Shipping from "components/cart/components/Shipping";
import { Wrapper, Actions, Flex } from "./styles";

const Checkout = () => {
	const { locale } = useIntl();
	const { state } = useCart();
	// const { dispatch } = useDispatchCart();

	return (
		<Wrapper as={Container}>
			<Actions>
				<Flex>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<Button as="a" wide marginBottom={2} variant="outlined">
							<FormattedMessage id="button.continue_shopping" />
						</Button>
					</Link>
					<Link href="/[lang]/cart" as={`/${locale}/cart`}>
						<Button as="a" wide marginBottom={2} variant="outlined">
							<FormattedMessage id="button.update_cart" />
						</Button>
					</Link>
				</Flex>
				<Coupon />
			</Actions>
			<Shipping state={state} locale={locale} />
		</Wrapper>
	);
};

export default Checkout;
