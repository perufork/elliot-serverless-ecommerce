import Link from "next/link";
// import Stars from "components/common/Stars";
import { Thumbnail, Details } from "./styles";
// import { HeartIcon } from "components/common/Icons";

export default ({ id, name, images, skus, onClick, locale }) => (
	<div>
		<Thumbnail>
			<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
				<a>
					{images.edges.map(({ node }, i) => (
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
					<strong>Add to cart</strong>
				</button>
				{/* <ul>
					<li>
						<HeartIcon width={16} height={16} />
					</li>
				</ul> */}
			</div>
		</Thumbnail>
		<div>
			<Details>
				<Link href="/[lang]/product/[id]" as={`/${locale}/product/${id}`}>
					<a>
						<h2>{name}</h2>
					</a>
				</Link>
				{/* <Stars stars={stars} /> */}
				{skus.edges[0].node.salePrice && (
					<p>
						<span>$</span> {skus.edges[0].node.salePrice / 100}
					</p>
				)}
			</Details>
		</div>
	</div>
);
