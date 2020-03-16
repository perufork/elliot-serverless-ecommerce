import { useCurrency } from "providers/CurrencyProvider";
import NumberFormat from "react-number-format";

const SummaryItem = ({ sum, display, label }) => {
	const { loading, state: currency } = useCurrency();
	return display ? (
		<h3>
			{label}:{" "}
			<strong>
				{loading ? (
					"..."
				) : (
					<NumberFormat
						value={sum}
						displayType={"text"}
						thousandSeparator={true}
						prefix={currency}
					/>
				)}
			</strong>
		</h3>
	) : null;
};

export default SummaryItem;
