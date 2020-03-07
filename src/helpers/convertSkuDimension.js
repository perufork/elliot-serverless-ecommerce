import convert from "convert-units";
import UnitsOfDimension from "./constants/UnitsOfDimension";

const convertSkuDimension = (fromUnit, amount) => {
	const fromUnitLabel = UnitsOfDimension.properties[fromUnit].label;
	const toUnitLabel = "in";

	if (fromUnitLabel && fromUnitLabel.toLowerCase() === toUnitLabel)
		return amount;

	const res = convert(amount)
		.from(fromUnitLabel)
		.to(toUnitLabel);

	return parseFloat(res.toFixed(4));
};

export default convertSkuDimension;
