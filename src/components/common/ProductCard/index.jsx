import Stars from "components/common/Stars";
import Button from "components/common/Button";
import thumbnailImage from "assets/product/product.jpg";
import { Wrapper, Thumbnail, Header, Details, Body, Footer } from "./styles";

export default ({
	thumbnail = thumbnailImage,
	image = thumbnailImage,
	title = "Lorem Ipsum",
	description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
	rating = 4,
	price = 100,
	currency = "$",
	onClick = () => alert("Added to cart")
}) => (
	<Wrapper>
		<Thumbnail>
			<img src={thumbnail} alt={title} />
		</Thumbnail>
		<div>
			<Header>
				<Details>
					<h2>{title}</h2>
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
					Add to Cart
				</Button>
			</Footer>
		</div>
	</Wrapper>
);
