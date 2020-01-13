import { useCallback } from "react";
import Swiper from "react-id-swiper";
import thumbnailImage from "assets/product/product.jpg";
import { Wrapper, Arrow } from "./styles";
import { CarouselArrow } from "components/common/Icons";

const productImages = [
	{
		image: thumbnailImage
	},
	{
		image: thumbnailImage
	},
	{
		image: thumbnailImage
	},
	{
		image: thumbnailImage
	}
];

const Carousel = ({ title }) => {
	const renderNavIcon = useCallback(
		flip => (
			<Arrow
				className={`swiper-button-${flip ? "next" : "prev"}`}
				prev={flip}
				role="button"
			>
				<CarouselArrow width={16} height={16} />
			</Arrow>
		),
		[]
	);

	const params = {
		direction: "horizontal",
		loop: true,
		slidesPerView: "auto",
		centeredSlides: true,
		spaceBetween: 15,
		pagination: {
			type: "bullet",
			el: ".swiper-pagination"
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		renderPrevButton: () => renderNavIcon(),
		renderNextButton: () => renderNavIcon(true),
		zoom: {
			toggle: true,
			maxRatio: 5,
			scale: 4
		},
		rebuildOnUpdate: true
	};

	return (
		<Wrapper {...params} as={Swiper}>
			{productImages.reduce((acc, { image }, i) => {
				if (i === 0 && productImages.length === 1) {
					return acc;
				}
				return [
					...acc,
					<div className="swiper-zoom-container" key={i}>
						<img key={i} src={image} alt={title} />
					</div>
				];
			}, [])}
		</Wrapper>
	);
};

export default Carousel;
