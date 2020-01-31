import styled from "styled-components";

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: calc(40% - 50px) 1fr;
	grid-column-gap: 50px;
	width: 100%;
	border-bottom: 1px solid #eaeaea;
	padding-bottom: 70px;

	@media screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const Thumbnail = styled.div`
	margin-right: 1rem;
	position: relative;
	overflow: hidden;
	width: 100%;
	flex: 1;

	@media screen and (max-width: 960px) {
		margin-right: unset;
		margin-bottom: 1rem;
		flex: unset;
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

export const Content = styled.div`
	padding-top: 30px;
	flex: 2;

	@media screen and (max-width: 960px) {
		flex: unset;
		width: 100%;
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
	padding-bottom: 20px;

	h2 {
		font-size: 24px;
		font-weight: 600;
		line-height: 1.4em;
		margin: 0;
		padding-bottom: 5px;
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
	p {
		margin: 0;
		line-height: 1.6em;
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const Footer = styled.div`
	text-align: left;
	padding-top: 40px;
`;
