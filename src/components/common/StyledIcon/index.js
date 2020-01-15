import styled from "styled-components";

const StyledIcon = styled.svg`
	path {
		color: ${({ color }) => color};
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
