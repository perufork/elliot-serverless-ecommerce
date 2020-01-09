const initialState = {
	open: false,
	cartContent: false
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_SIDEBAR":
			return {
				...state,
				open: true,
				cartContent: action.cartContent
			};
		case "CLOSE_SIDEBAR":
			return {
				...state,
				open: false,
				cartContent: setTimeout(() => action.cartContent, 200)
			};
		default:
			return {
				state
			};
	}
};

export default cartReducer;
