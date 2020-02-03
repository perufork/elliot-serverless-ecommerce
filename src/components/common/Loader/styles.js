import styled from "styled-components";

export const Loading = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999999;
	overflow: hidden;

	&.loaded {
		visibility: hidden;
		transition: all 300ms ease-out 1000ms;
		transform: translateY(-100%);
		.section__left {
			transform: translateX(-100%);
		}
		.section__right {
			transform: translateX(100%);
		}
	}

	.loader__section {
		position: fixed;
		top: 0;
		width: 51%;
		height: 100%;
		background: #ffffff;
		z-index: 999;
	}

	.section__left {
		transition: all 700ms cubic-bezier(0.645, 0.045, 0.355, 1) 300ms;
		left: 0;
	}

	.section__right {
		transition: all 700ms cubic-bezier(0.645, 0.045, 0.355, 1) 300ms;
		right: 0;
	}
`;
