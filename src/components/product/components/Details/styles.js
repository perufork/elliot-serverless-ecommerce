import styled from "styled-components";

export const Wrapper = styled.div`
	h2 {
		font-weight: 700;
		color: ${({ theme: { colors } }) => colors.black};
		line-height: 1.3em;
		text-transform: none;
		font-size: 22pt;
		margin-top: 0;
		margin-bottom: 2rem;

		@media screen and (min-width: 992px) {
			font-size: 28pt;
		}
	}

	h4 {
		margin-bottom: 1rem;
		font-size: 18pt;
		font-weight: 400;
		color: ${({ theme: { colors } }) => colors.black};

		@media screen and (min-width: 992px) {
			font-size: 24pt;
			margin-bottom: 1rem;
		}
	}

	h5 {
		margin: 0 0 30px 0;
		font-size: 24px;
		line-height: 1;
		font-weight: 400;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: 0;
		color: #777777;
		font-size: 12pt;
		line-height: 1.6;

		@media screen and (min-width: 992px) {
			font-size: 11pt;
			margin-bottom: 1rem;
		}
	}
`;

export const Review = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: 1rem;

	span {
		margin-left: 1rem;
		color: #999;
		font-size: 12pt;
	}
`;

export const Sku = styled.span`
	display: block;
	margin-bottom: 1rem;
	font-size: 10pt;
	color: #bbbbbb;
`;

export const Shop = styled.div`
	display: grid;
	grid-template-columns: 150px 1fr;
	grid-gap: 15px;
	margin: 30px 0;

	@media (max-width: 450px) {
		grid-template-columns: 1fr;
	}
`;

export const ButtonGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr 45px;
	grid-gap: 15px;
`;

export const MainAction = styled.div`
	grid-column-start: 1;
	grid-column-end: -1;
`;

export const Favorite = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #999999;
	border: 2px solid #eaeaea;
	cursor: pointer;
	background: none;
	margin: 0 auto;
	width: 100%;

	@media screen and (max-width: 960px) {
		padding: 0.8rem 0;
	}

	svg {
		align-self: center;
	}
`;

export const Specs = styled.div`
	margin-bottom: 2rem;
	padding-top: 20px;
	border-top: 1px solid #eaeaea;

	p {
		color: ${({ theme: { colors } }) => colors.black};

		strong {
			margin-right: 5px;
			text-transform: uppercase;
			font-weight: bold;
		}

		a {
			color: #999;
			font-size: 15px;

			&:after {
				content: ",";
				padding-right: 3px;
			}

			&:first-child {
				padding-left: 5px;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}
		}
	}
`;

export const SocialShares = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 20px;
	a {
		width: 30px;
		height: 30px;
		margin-right: 5px;
	}
`;
