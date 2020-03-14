export const removeFromCart = async ({ dispatch, skuId }) => {
	try {
		await dispatch({
			type: "REMOVE_FROM_CART",
			skuId
		});
	} catch (err) {
		console.log(err);
	}
};

export const addQuantityByProduct = async ({ dispatch, id, skuId }) => {
	try {
		await dispatch({
			type: "ADD_QUANTITY",
			id,
			skuId
		});
	} catch (err) {
		console.log(err);
	}
};

export const addCustomQuantityByProduct = async ({
	dispatch,
	quantity,
	skuId
}) => {
	try {
		await dispatch({
			type: "ADD_CUSTOM_QUANTITY",
			quantity,
			skuId
		});
	} catch (err) {
		console.log(err);
	}
};

export const subtractQuantityByProduct = async ({ dispatch, id, skuId }) => {
	try {
		await dispatch({
			type: "SUBTRACT_QUANTITY",
			id,
			skuId
		});
	} catch (err) {
		console.log(err);
	}
};

export const addToCart = async ({ dispatch, payload }) => {
	try {
		await dispatch({
			type: "ADD_TO_CART",
			payload
		});
	} catch (err) {
		console.log(err);
	}
};
