import { useGlobalState } from "providers/GlobalStateProvider";
import formatMoney from "helpers/formatMoney";
import { useCurrency } from "providers/CurrencyProvider";

const useShippingInfo = () => {
	const { exchangeRate } = useCurrency();
	const { state: globalState } = useGlobalState();

	let { shippingCost } = globalState;

	const { duty = 0, tax = 0, flatRateShipping, freeShipping } = globalState;

	const shippingInfoExists = parseInt(shippingCost) > 0;

	if (!shippingInfoExists) {
		return {};
	}

	if (flatRateShipping) {
		shippingCost = parseInt(flatRateShipping.value);
	}

	if (freeShipping) {
		shippingCost = 0;
	}

	let shippingTotal = parseInt(duty) + parseInt(tax) + parseInt(shippingCost);
	shippingTotal = formatMoney({ sum: shippingTotal, exchangeRate });

	return {
		duty,
		tax,
		shippingCost,
		shippingTotal
	};
};

export default useShippingInfo;
