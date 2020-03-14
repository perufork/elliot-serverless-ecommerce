const getTaxAndDutyFromShippingOptions = shippingOptions =>
	shippingOptions.reduce(
		(acc, { tax, duty }) => ({
			tax: parseInt(tax || 0) + acc.tax,
			duty: parseInt(duty || 0) + acc.duty
		}),
		{
			tax: 0,
			duty: 0
		}
	);

export default getTaxAndDutyFromShippingOptions;
