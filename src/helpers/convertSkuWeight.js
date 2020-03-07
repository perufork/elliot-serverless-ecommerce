import convert from "convert-units";
import UnitsOfWeight from "./constants/UnitsOfWeight";

const convertSkuWeight = (fromUnit, amount) => {
	const fromUnitLabel = UnitsOfWeight.properties[fromUnit].label;
	const toUnitLabel = "oz";

	if (fromUnitLabel && fromUnitLabel.toLowerCase() === toUnitLabel)
		return amount;

	const res = convert(amount)
		.from(fromUnitLabel)
		.to(toUnitLabel);

	return parseFloat(res.toFixed(4));
};

export default convertSkuWeight;
