import { useState, useEffect } from "react";
import Button from "components/common/Button";

const BuyButton = ({ canSubmit, price }) => {
	const [loading, setLoading] = useState(false);

	const buttonContent = loading ? (
		<span className="loader--simple"></span>
	) : (
		`PAY $${price}`
	);

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
			{buttonContent}
		</Button>
	);
};

export default BuyButton;
