export const removeFromCart = async ({ dispatch, id }) => {
	try {
		await dispatch({
			type: "REMOVE_FROM_CART",
			id
		});
	} catch (err) {
		console.log(err);
	}
};

export const addQuantityByProduct = async ({ dispatch, id }) => {
	try {
		await dispatch({
			type: "ADD_QUANTITY",
			id
		});
	} catch (err) {
		console.log(err);
	}
};

export const addCustomQuantityByProduct = async ({
	dispatch,
	id,
	quantity
}) => {
	try {
		await dispatch({
			type: "ADD_CUSTOM_QUANTITY",
			id,
			quantity
		});
	} catch (err) {
		console.log(err);
	}
};

export const subtractQuantityByProduct = async ({ dispatch, id }) => {
	try {
		await dispatch({
			type: "SUBTRACT_QUANTITY",
			id
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
