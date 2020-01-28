import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Stars from "components/common/Stars";
import Button from "components/common/Button";
import {
	Wrapper,
	Thumbnail,
	Content,
	Header,
	Details,
	Body,
	Footer
} from "./styles";

export default ({
	id,
	name,
	description,
	images,
	gender,
	skus,
	onClick,
	locale
}) => (
	<Wrapper>
		<Thumbnail>
			<Link href="/[lang]/product/[id]" as={`/${locale}/product/${slug}`}>
				<a>
					<>
						{images.edges.map(({ node }) => (
							<img
								key={node.id}
								src={`${process.env.ELLIOT_BASE_IMAGE_URL}${node.image}`}
								alt={name}
							/>
						))}
					</>
				</a>
			</Link>
		</Thumbnail>
		<Content>
			<Header>
				<Details>
					<Link href="/[lang]/product/[id]" as={`/${locale}/product/${slug}`}>
						<a>
							<h2>{name}</h2>
						</a>
					</Link>
					{skus.edges[0].node.salePrice && (
						<p>
							<span>$</span> {skus.edges[0].node.salePrice}
						</p>
					)}
				</Details>
				<div>
					<Stars stars={gender} />
				</div>
			</Header>
			<Body dangerouslySetInnerHTML={{ __html: description }} />
			<Footer>
				<Button onClick={onClick} type="button" variant="primary">
					<FormattedMessage id="button.add_to_cart" />
				</Button>
			</Footer>
		</Content>
	</Wrapper>
);
