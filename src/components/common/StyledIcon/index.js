import styled from "styled-components";

const StyledIcon = styled.svg`
	display: flex;
	align-items: center;
	justify-content: center;

	path {
		color: ${({ color }) => color};
		transition: all 200ms ease;
	}

	&:hover {
		path {
			fill: ${({
				hover,
				theme: {
					colors: { accent }
				}
			}) => (hover ? hover : accent)};
		}
	}
`;

export default StyledIcon;
