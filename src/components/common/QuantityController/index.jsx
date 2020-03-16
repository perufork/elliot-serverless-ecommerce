import { MinusIcon, PlusIcon } from "components/common/Icons";
import { Wrapper, Controller } from "./styles";

export default ({ wide, skuId, quantity, setQuantity, cart }) => {
	const handleQuantity = ({ type, value }) => {
		if (cart) {
			switch (type) {
				case "add":
					return setQuantity({
						quantity: quantity + 1,
						skuId
					});
				case "subtract":
					return setQuantity({
						quantity: quantity - 1,
						skuId
					});
				default:
					return setQuantity({
						quantity: value,
						skuId
					});
			}
		} else {
			switch (type) {
				case "add":
					return setQuantity(quantity + 1);
				case "subtract":
					return setQuantity(quantity - 1);
				default:
					return setQuantity(value);
			}
		}
	};

	return (
		<Wrapper wide={wide}>
			<Controller
				disabled={quantity <= 1}
				onClick={() =>
					handleQuantity({
						type: "subtract"
					})
				}
			>
				<MinusIcon
					color={quantity <= 1 ? "#585858" : "#000"}
					width={16}
					height={16}
				/>
			</Controller>
			<input
				type="text"
				value={quantity}
				onChange={e =>
					handleQuantity({
						type: "value",
						value: e.target.value
					})
				}
			/>
			<Controller
				onClick={() =>
					handleQuantity({
						type: "add"
					})
				}
			>
				<PlusIcon width={16} height={16} />
			</Controller>
		</Wrapper>
	);
};
