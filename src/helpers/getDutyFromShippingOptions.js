const getDutyFromShippingOptions = allShippingOptions =>
	allShippingOptions.reduce((acc, { duty: iDuty }) => acc + iDuty, 0);

export default getDutyFromShippingOptions;
