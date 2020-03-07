import { useState /* useEffect */ } from "react";
import Button from "components/common/Button";
import NumberFormat from "react-number-format";

const BuyButton = ({ canSubmit, price, currency, loadingCurrency }) => {
	const [loading /* setLoading */] = useState(false);

	// useEffect(() => {
	//   if (checkout.shipping_preference === ShippingPreference.IN_STORE) {
	//     // We only need tax for in-store checkouts so we don't need input from the client before we run this
	//     setLoading(true);
	//     (async () => {
	//       const taxPayload = await getVendorShippingInfo({
	//         vendors,
	//         parcels,
	//         checkout,
	//         cart,
	//         cartPriceSumRaw
	//       });

	//       const taxAmount = getTaxFromShippingOptions(taxPayload);
	//       const vendorTax = getVendorTax(taxPayload);
	//       setOrderTax(taxAmount);
	//       setVendorShippingOptions(vendorTax);
	//       setLoading(false);
	//     })();
	//   }
	// }, [JSON.stringify(cart)]);

	return (
		<Button
			variant="primary"
			type="submit"
			disabled={!canSubmit || loading}
			wide
			marginBottom={1}
		>
			{loading || loadingCurrency ? (
				<span className="loader--simple"></span>
			) : (
				<>
					PAY{" "}
					<NumberFormat
						value={price}
						displayType={"text"}
						thousandSeparator={true}
						prefix={currency}
					/>
				</>
			)}
		</Button>
	);
};

export default BuyButton;
