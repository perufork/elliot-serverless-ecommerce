import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Stars from "components/common/Stars";
import Button from "components/common/Button";
import thumbnailImage from "assets/product/product.jpg";
import thumbnailSecondaryImage from "assets/product/product-2.jpg";
import { Wrapper, Thumbnail, Header, Details, Body, Footer } from "./styles";

export default ({
	id,
	thumbnail = thumbnailImage,
	image = thumbnailSecondaryImage,
	title = "Lorem Ipsum",
	description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
	rating = 4,
	price = 100,
	currency = "$",
	onClick,
	locale
}) => (
	<Wrapper>
		<Thumbnail>
			<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
				<a>
					<>
						<img src={thumbnail} alt={title} />
						<img src={image} alt={title} />
					</>
				</a>
			</Link>
		</Thumbnail>
		<div>
			<Header>
				<Details>
					<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
						<a>
							<h2>{title}</h2>
						</a>
					</Link>
					<p>
						<span>{currency}</span> {price}
					</p>
				</Details>
				<div>
					<Stars stars={rating} />
				</div>
			</Header>
			<Body>
				<p>{description}</p>
			</Body>
			<Footer>
				<Button onClick={onClick} type="button" variant="primary">
					<FormattedMessage id="button.add_to_cart" />
				</Button>
			</Footer>
		</div>
	</Wrapper>
);
