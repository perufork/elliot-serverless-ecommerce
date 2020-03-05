// import Label from "../Label";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
// import Stars from "components/common/Stars";
import { Thumbnail, Details } from "./styles";
// import { HeartIcon } from "components/common/Icons";

export default ({ slug, name, images, skus, onClick, locale }) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	return (
		<div>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						{images?.edges?.map(({ node }, i) => (
							<img
								key={node.id}
								className={i === 1 ? "secondary" : 0}
								src={`${process.env.ELLIOT_BASE_IMAGE_URL}${node.image}`}
								alt={name}
							/>
						))}
					</a>
				</Link>
				<div>
					<button type="button" onClick={onClick}>
						<strong>
							<FormattedMessage id="button.add_to_cart" />
						</strong>
					</button>
					{/* <ul>
					<li>
						<HeartIcon width={16} height={16} />
					</li>
				</ul> */}
				</div>
				{/* <Label>
				<span>Sale</span>
			</Label> */}
			</Thumbnail>
			<div>
				<Details>
					<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
						<a>
							<h2>{name}</h2>
						</a>
					</Link>
					{/* <Stars stars={stars} /> */}
					{skus?.edges[0]?.node?.salePrice && (
						<p>
							{loading ? (
								"..."
							) : (
								<NumberFormat
									value={(skus.edges[0].node.salePrice * exchangeRate) / 100}
									displayType={"text"}
									thousandSeparator={true}
									prefix={currency}
								/>
							)}
						</p>
					)}
				</Details>
			</div>
		</div>
	);
};
