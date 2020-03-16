import styled from "styled-components";

export const IconWrapper = styled.span`
	display: inline-block;
	height: 0;
	overflow: visible;
	position: relative;
	bottom: 1rem;
	${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}rem`}
`;
