import NumberFormat from "react-number-format";
import { Wrapper } from "./styles";

export default ({ salePrice, basePrice, loading, exchangeRate, currency }) => (
	<Wrapper>
		<p
			style={{
				textDecoration: salePrice && "line-through"
			}}
		>
			{loading ? (
				"..."
			) : (
				<NumberFormat
					value={(basePrice * exchangeRate) / 100}
					displayType={"text"}
					thousandSeparator={true}
					prefix={currency}
				/>
			)}
		</p>
		{salePrice && (
			<p>
				{loading ? (
					"..."
				) : (
					<NumberFormat
						value={(salePrice * exchangeRate) / 100}
						displayType={"text"}
						thousandSeparator={true}
						prefix={currency}
					/>
				)}
			</p>
		)}
	</Wrapper>
);
