import styled from "styled-components";

const StyledIcon = styled.svg`
	&:hover {
		path {
			fill: ${({
				theme: {
					colors: { accent }
				}
			}) => accent};
		}
	}
`;

export default StyledIcon;
