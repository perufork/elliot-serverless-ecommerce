import styled from "styled-components";

export const Label = styled.label`
	background: ${({ theme: { colors }, isHot }) =>
		isHot ? colors.red : colors.accent};
	position: absolute;
	top: 0;
	top: 20px;
	left: 20px;
	z-index: 5;
	border-radius: 3px;
	span {
		display: inline-block;
		font-size: 9.75pt;
		padding: 7px 10px;
		font-weight: 600;
		text-align: center;
		line-height: 1;
		color: ${({ theme: { colors } }) => colors.white};
	}
`;
