import Link from "next/link";
import { useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { CartItem, Thumbnail, Content } from "./styles";

export default ({
	hit: { name, slug, product_image_url, productSkus, product_gender }
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { locale } = useIntl();

	return (
		<CartItem>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						<img src={product_image_url} alt={name} />
					</a>
				</Link>
			</Thumbnail>
			<Content>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>{name}</a>
				</Link>
				<p>{product_gender}</p>
				{productSkus && productSkus[0]?.sale_price && loading ? (
					"..."
				) : (
					<NumberFormat
						value={(productSkus[0].sale_price * exchangeRate) / 100}
						displayType={"text"}
						thousandSeparator={true}
						prefix={currency}
					/>
				)}
			</Content>
		</CartItem>
	);
};
