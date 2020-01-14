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
			disabled={quantity <= 1 || quantity < 0}
			onClick={() => subtractQuantityByProduct({ dispatch, id })}
		>
			<MinusIcon
				color={quantity === 1 ? "#bbb" : "#222"}
				width={16}
				height={16}
			/>
		</Controller>
		<input type="text" value={quantity} readOnly />
		<Controller
			disalbed={quantity <= 0}
			onClick={() => addQuantityByProduct({ dispatch, id })}
		>
			<PlusIcon
				color={quantity === 1 ? "#bbb" : "#222"}
				width={16}
				height={16}
			/>
		</Controller>
	</Wrapper>
);
