import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { useCurrency } from "providers/CurrencyProvider";
// import Stars from "components/common/Stars";
import Label from "components/common/Label";
import Prices from "components/common/Prices";
// import { HeartIcon } from "components/common/Icons";
import { Thumbnail, Details } from "./styles";

export default ({ slug, name, images, skus, onClick, locale }) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	return (
		<div>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						{images?.edges?.length > 1 ? (
							images.edges
								.slice(0, 2)
								.map(({ node }, i) => (
									<img
										key={node.id}
										className={i === 1 ? "secondary" : 0}
										src={`https://storage.googleapis.com/elliot-images-us/${node.image}`}
										alt={name}
									/>
								))
						) : (
							<>
								<img
									src={`https://storage.googleapis.com/elliot-images-us/${images.edges[0].node.image}`}
									alt={name}
								/>
								<img
									className="secondary"
									src={`https://storage.googleapis.com/elliot-images-us/${images.edges[0].node.image}`}
									alt={name}
								/>
							</>
						)}
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
				{skus?.edges[0]?.node?.salePrice && (
					<Label>
						<span>Sale</span>
					</Label>
				)}
			</Thumbnail>
			<div>
				<Details>
					<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
						<a>
							<h2>{name}</h2>
						</a>
					</Link>
					{/* <Stars stars={stars} /> */}
					<Prices
						salePrice={skus?.edges[0]?.node?.salePrice}
						basePrice={skus?.edges[0]?.node?.basePrice}
						loading={loading}
						exchangeRate={exchangeRate}
						currency={currency}
					/>
				</Details>
			</div>
		</div>
	);
};
