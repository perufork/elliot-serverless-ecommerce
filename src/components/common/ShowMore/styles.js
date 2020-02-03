import styled from "styled-components";

export const ShowMore = styled.div`
	display: block;
	margin-top: 65px;
	text-align: center;
	width: 100%;

	a {
		color: ${({ theme: { colors } }) => colors.black};
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.05em;
		position: relative;
		text-transform: uppercase;
		transition: all 0.4s ease;

		&:before {
			background-color: ${({ theme: { colors } }) => colors.black};
			content: "";
			height: 2px;
			left: 0;
			position: absolute;
			top: 100%;
			transition: all 0.4s ease;
			width: 100%;
		}

		&:hover {
			color: ${({ theme: { colors } }) => colors.accent};
			&:before {
				background-color: ${({ theme: { colors } }) => colors.accent};
			}
		}
	}
`;
