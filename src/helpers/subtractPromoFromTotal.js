import getPromotionValidity from "helpers/getPromotionValidity";
import getOrderAfterPromo from "helpers/getOrderTotalAfterPromo";

const subtractPromoFromTotal = ({ orderTotal, exchangeRate, promotion }) => {
	let updatedOrderTotal = orderTotal;
	if (promotion && getPromotionValidity(promotion)) {
		updatedOrderTotal =
			getOrderAfterPromo({ orderTotal, promotion }) * exchangeRate;
	}
	if (updatedOrderTotal < 0) {
		return 0;
	}

	return updatedOrderTotal;
};

export default subtractPromoFromTotal;
