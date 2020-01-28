import { useCallback } from "react";
import Swiper from "react-id-swiper";
import { Wrapper, Arrow } from "./styles";
import { CarouselArrow } from "components/common/Icons";

const Carousel = ({ name, images }) => {
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
			{images.edges.reduce((acc, { node: { image, id } }, i) => {
				if (i === 0 && images.edges.length === 1) {
					return acc;
				}
				return [
					...acc,
					<div key={id}>
						<img
							className="swiper-zoom-container"
							src={`${process.env.ELLIOT_BASE_IMAGE_URL}${image}`}
							alt={name}
						/>
					</div>
				];
			}, [])}
		</Wrapper>
	);
};

export default Carousel;
