import { MinusIcon, PlusIcon } from "components/common/Icons";
import { Wrapper, Controller } from "./styles";

export default ({
	wide,
	id,
	dispatch,
	quantity,
	subtractQuantityByProduct,
	addQuantityByProduct
}) => (
	<Wrapper wide={wide}>
		<Controller
			disabled={quantity === 1}
			onClick={() => subtractQuantityByProduct({ dispatch, id })}
		>
			<MinusIcon color={quantity === 1 && "#bbb"} width={16} height={16} />
		</Controller>
		<input type="text" value={quantity} readOnly />
		<Controller
			disalbed={quantity === 0}
			onClick={() => {
				if (quantity === 0) return null;
				addQuantityByProduct({ dispatch, id });
			}}
		>
			<PlusIcon color={quantity === 1 && "#bbb"} width={16} height={16} />
		</Controller>
	</Wrapper>
);
