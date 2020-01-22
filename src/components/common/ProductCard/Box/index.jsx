import Link from "next/link";
import Stars from "components/common/Stars";
import thumbnailImage from "assets/product/product.jpg";
import thumbnailSecondaryImage from "assets/product/product-2.jpg";
import { Thumbnail, Details } from "./styles";
import { HeartIcon } from "components/common/Icons";

export default ({
	id,
	thumbnail = thumbnailImage,
	image = thumbnailSecondaryImage,
	title = "Lorem Ipsum",
	rating = 4,
	price = 100,
	currency = "$",
	onClick,
	locale
}) => (
	<div>
		<Thumbnail>
			<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
				<a>
					<>
						<img src={thumbnail} alt={title} />
						<img className="secondary" src={image} alt={title} />
					</>
				</a>
			</Link>
			<div>
				<button type="button" onClick={onClick}>
					Add to cart
				</button>
				<ul>
					<li>
						<HeartIcon width={16} height={16} />
					</li>
				</ul>
			</div>
		</Thumbnail>
		<div>
			<Details>
				<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
					<a>
						<h2>{title}</h2>
					</a>
				</Link>
				<Stars stars={rating} />
				<p>
					<span>{currency}</span> {price}
				</p>
			</Details>
		</div>
	</div>
);
