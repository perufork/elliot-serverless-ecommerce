const getTaxFromShippingOptions = allShippingOptions =>
	allShippingOptions.reduce((acc, { tax }) => acc + tax, 0);

export default getTaxFromShippingOptions;
