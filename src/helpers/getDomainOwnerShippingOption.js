import KeyWords from "./constants/KeyWords";

const getDomainOwnerShippingOption = allShippingOptions =>
	allShippingOptions.find(
		({ vendor }) => vendor === KeyWords.properties[KeyWords.DEFAULT].label
	);

export default getDomainOwnerShippingOption;
