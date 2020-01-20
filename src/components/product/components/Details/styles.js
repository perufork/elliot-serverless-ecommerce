import styled from "styled-components";

export const Wrapper = styled.div`
	h2 {
		font-weight: 700;
		color: #222;
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
		color: #222;

		@media screen and (min-width: 992px) {
			font-size: 24pt;
			margin-bottom: 1rem;
		}
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
	margin-bottom: 36px;
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
		margin-bottom: 2rem;
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
		color: #222;

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
