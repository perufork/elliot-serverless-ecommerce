const initialState = [];

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				data: action.payload
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				data: action.payload
			};
		case "CLEAR_CART":
			return initialState;
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

export default cartReducer;
