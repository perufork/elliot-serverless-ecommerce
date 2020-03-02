import convertSkuWeight from "./convertSkuWeight";
import convertSkuDimension from "./convertSkuDimension";

const createParcel = (
	fixedPackageType,
	customPackageType,
	unitOfWeight,
	weight,
	quantity
) => {
	const accWeight = JSON.stringify(weight * quantity);
	let parcel = {
		distance_unit: "in",
		mass_unit: "oz",
		weight: convertSkuWeight(unitOfWeight, accWeight)
	};

	if (fixedPackageType) {
		const unitOfDimensions = fixedPackageType.unitOfDimensions;

		parcel = {
			...parcel,
			length: convertSkuDimension(unitOfDimensions, fixedPackageType.length),
			width: convertSkuDimension(unitOfDimensions, fixedPackageType.width),
			height: convertSkuDimension(unitOfDimensions, fixedPackageType.height)
		};
	} else if (customPackageType) {
		const unitOfDimensions = customPackageType.unit_of_dimensions;

		parcel = {
			...parcel,
			length: convertSkuDimension(unitOfDimensions, customPackageType.length),
			width: convertSkuDimension(unitOfDimensions, customPackageType.width),
			height: convertSkuDimension(unitOfDimensions, customPackageType.height)
		};
	}
	return parcel;
};

export default createParcel;
