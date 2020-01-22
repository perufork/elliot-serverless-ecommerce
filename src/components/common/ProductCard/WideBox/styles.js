import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	border-bottom: 1px solid #eaeaea;
	padding: 0 0 3rem 0;

	@media screen and (max-width: 960px) {
		flex-direction: column;
	}
`;

export const Thumbnail = styled.div`
	margin-right: 1rem;
	position: relative;
	overflow: hidden;

	@media screen and (min-width: 1200px) {
		max-width: calc(40% - 50px);
	}

	@media screen and (min-width: 768px) {
		max-width: calc(40% - 30px);
	}

	@media screen and (max-width: 960px) {
		margin-right: unset;
		margin-bottom: 1rem;
	}

	img {
		width: 100%;
		transition: all 0.4s cubic-bezier(0.7, 0, 0.3, 1);
		opacity: 1;

		&:last-child {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	&:hover {
		img {
			&:first-child {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
			&:last-child {
				opacity: 1;
				position: unset;
			}
		}
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	@media screen and (max-width: 960px) {
		flex-direction: column;
	}
`;

export const Details = styled.div`
	h2 {
		font-size: 24px;
		font-weight: 600;
		line-height: 1.4em;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: unset;
		font-size: 16px;
		font-weight: 600;
		margin-top: 8px;
		color: ${({ theme: { colors } }) => colors.lightGray};

		span {
			margin-right: 0.04rem;
		}
	}
`;

export const Body = styled.div`
	padding: 2rem 0;

	p {
		line-height: 1.6em;
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const Footer = styled.div`
	text-align: left;
`;
