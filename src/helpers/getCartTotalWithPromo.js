import getPromotionValidity from "./getPromotionValidity";
import PromotionDiscountType from "./constants/PromotionDiscountType";

const getCartTotalWithPromo = (orderTotal, promotion) => {
	let updatedOrderTotal = orderTotal;
	if (promotion && getPromotionValidity(promotion)) {
		if (promotion.discount_type === PromotionDiscountType.PERCENTAGE) {
			updatedOrderTotal = parseInt(
				(orderTotal * (100 - promotion.discount_value)) / 100
			);
		} else {
			updatedOrderTotal = orderTotal - promotion.discount_value;
		}
	}
	if (updatedOrderTotal < 0) {
		return 0;
	}

	return updatedOrderTotal;
};

export default getCartTotalWithPromo;
