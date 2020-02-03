import styled from "styled-components";

export const Description = styled.div`
	h3 {
		margin-bottom: 40px;
		font-weight: 400;
		font-size: 24px;
		margin-top: 0;
		color: ${({ theme: { colors } }) => colors.black};
	}
	p,
	li {
		margin-bottom: 25px;
		font-size: 16px;
		color: #777;
		line-height: 1.6em;
	}
	ul {
		margin: 0;
		padding-left: 20px;
	}
	li {
		margin-bottom: 0;
		line-height: 1.5;
	}
	img {
		display: inline-block;
		outline: 0;
		max-width: 100%;
		height: auto;
	}
`;

export const Addition = styled.div`
	table {
		border-collapse: collapse;
		width: 100%;
		margin-bottom: 1rem;
		background-color: transparent;
		border: 1px solid #eaeaea;
	}
	td,
	th {
		padding: 10px 15px;
		color: ${({ theme: { colors } }) => colors.black};
		vertical-align: middle;
		border: none;
		font-size: 14px;
		border-bottom: 1px solid #ddd;
	}
	.td__key {
		max-width: 150px;
		width: 150px;
		font-weight: 600;
		background-color: #eaeaea;
	}
`;

export const Review = styled.div`
	h4 {
		margin: 10px 0 16px 0;
		font-size: 16px;
		font-weight: 600;
		color: #222;
		span {
			color: #999;
		}
	}
	p {
		line-height: 1.6em;
		color: #999;
		font-size: 16px;
		small {
			margin-bottom: 20px;
			color: #222;
			font-size: 14px;
			line-height: 1.6em;
		}
	}
	.social__connect {
		list-style-type: none;
		padding: 0;
		margin: 0;

		&__item {
			position: relative;
			display: inline-block;
			margin-right: 10px;
			&:last-of-type {
				margin-right: 0;
			}
		}
	}
	h5 {
		margin-bottom: 1.5rem;
		font-weight: 500;
		font-size: 18px;
	}
`;

export const ReviewUser = styled.div``;
export const TwoColumns = styled.div``;
