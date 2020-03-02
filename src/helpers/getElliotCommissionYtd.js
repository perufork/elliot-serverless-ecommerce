const getElliotCommissionYtd = orders => {
	const currentYear = new Date().getFullYear();

	const elliotCommisionYtd = orders
		.filter(
			order =>
				order.elliot_commission &&
				new Date(order.created_on).getFullYear() === currentYear
		)
		.reduce(
			(accValue, currValue) =>
				currValue && currValue.elliot_commission
					? currValue.elliot_commission + accValue
					: accValue,
			0
		);

	return elliotCommisionYtd;
};

export default getElliotCommissionYtd;
