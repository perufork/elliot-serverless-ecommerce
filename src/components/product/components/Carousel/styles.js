import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 50%;
	margin: 0;
	padding: 0;
	min-width: 50%;
	border-radius: 0;

	img {
		background-color: #f7f7f7;
		width: 100%;
		max-width: 18.75rem;
	}
`;

export const Arrow = styled.div`
	background-image: none;
	width: 2.1875rem;
	height: 2.1875rem;
	background-color: white;
	border-radius: 0.25rem;
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
			fill: ${({ theme: { colors } }) => colors.white};
		}
	}
`;
