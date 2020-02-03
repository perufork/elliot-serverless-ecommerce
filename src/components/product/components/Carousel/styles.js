import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 50%;
	margin: 0;
	padding: 0;
	min-width: 50%;
	border-radius: 0;
	z-index: 0;

	img {
		background-color: #f7f7f7;
		width: 100%;
		max-width: 300px;
	}
`;

export const Arrow = styled.div`
	background-image: none;
	width: 35px;
	height: 35px;
	background-color: white;
	border-radius: 4px;
	display: flex;
	justify-content: center;

	svg {
		align-self: center;
		display: flex;
	}

	${({ prev }) =>
		!prev &&
		`
    transform: scaleX(-1);
  `}

	&:hover {
		background-color: ${({
			theme: {
				colors: { accent }
			}
		}) => accent};

		svg path {
			fill: "#fff";
		}
	}
`;
