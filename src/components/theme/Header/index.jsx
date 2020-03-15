import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import Brand from "./components/Brand";
import Links from "./components/Links";
import Buttons from "./components/Buttons";
import Sidebar from "components/theme/Header/components/Sidebar";
import { useSidebar, useDispatchSidebar } from "providers/SidebarProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { Container, Banner, Wrapper, Options } from "./styles";

export default ({ collections, seoDetails, promotion, checkout }) => {
	const { state } = useSidebar();
	const { dispatch } = useDispatchSidebar();
	const { state: currency, exchangeRate, loading } = useCurrency();

	const toggleSidebar = ({ type, content }) => {
		dispatch({
			type,
			content
		});
	};

	return (
		<>
			<Sidebar
				visibleSidebar={state.open}
				toggleSidebar={toggleSidebar}
				content={state.content}
				checkout={checkout}
			/>
			<Container>
				{promotion && (
					<Banner>
						<FormattedMessage id="banner.free_shipping_over" />{" "}
						{loading ? (
							"..."
						) : (
							<NumberFormat
								value={(promotion.discountValue * exchangeRate) / 100}
								displayType={"text"}
								thousandSeparator={true}
								prefix={currency}
							/>
						)}
					</Banner>
				)}
				<Wrapper>
					<Brand seoDetails={seoDetails} />
					<Links collections={collections} />
					<Options>
						<Buttons toggleSidebar={toggleSidebar} />
					</Options>
				</Wrapper>
			</Container>
		</>
	);
};
