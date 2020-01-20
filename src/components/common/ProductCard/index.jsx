import { FormattedMessage, useIntl } from "react-intl";
import Stars from "components/common/Stars";
import Button from "components/common/Button";
import thumbnailImage from "assets/product/product.jpg";
import { Wrapper, Thumbnail, Header, Details, Body, Footer } from "./styles";
import Link from "next/link";

export default ({
	id,
	thumbnail = thumbnailImage,
	image = thumbnailImage,
	title = "Lorem Ipsum",
	description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
	rating = 4,
	price = 100,
	currency = "$",
	onClick
}) => {
	const { locale } = useIntl();

	return (
		<Wrapper>
			<Thumbnail>
				<img src={thumbnail} alt={title} />
			</Thumbnail>
			<div>
				<Header>
					<Details>
						<Link
							href={`/[lang]/product?id=${id}`}
							as={`/${locale}/product/${id}`}
						>
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
};
