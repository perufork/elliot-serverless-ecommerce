import styled from "styled-components";

export const Label = styled.label`
	background: ${({ isHot }) =>
		isHot
			? ({ theme: { colors } }) => colors.red
			: ({ theme: { colors } }) => colors.accent};
	position: absolute;
	top: 0;
	top: 20px;
	left: 20px;
	z-index: 20;
	border-radius: 3px;
	span {
		display: inline-block;
		font-size: 13px;
		padding: 7px 10px;
		font-weight: 600;
		text-align: center;
		line-height: 1;
		color: ${({ theme: { colors } }) => colors.white};
	}
`;
