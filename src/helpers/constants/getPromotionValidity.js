const getPromotionValidity = promotion => {
	const start = Date.parse(promotion.start_datetime);
	const end = promotion.end_datetime
		? Date.parse(promotion.end_datetime)
		: Infinity;
	const now = Date.now();
	if (now >= start && now <= end) {
		return true;
	}
	return false;
};

export default getPromotionValidity;
