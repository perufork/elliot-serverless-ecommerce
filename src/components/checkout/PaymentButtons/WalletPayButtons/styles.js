import styled from "styled-components";

export const IconWrapper = styled.span`
	display: inline-block;
	overflow: visible;
	position: relative;
	${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}rem`};
	height: 1em;
	bottom: 50%;
	transform: translateY(-25%);
`;
