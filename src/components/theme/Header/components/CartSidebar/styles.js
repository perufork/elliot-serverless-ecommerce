import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
`;

export const CartItem = styled.div`
	padding-bottom: 30px;
	margin-bottom: 30px;
	border-bottom: 1px solid #eaeaea;
	display: flex;
	justify-content: space-between;

	&:last-child {
		border-bottom: unset;
	}
`;

export const Thumbnail = styled.div`
	position: relative;
	overflow: hidden;
	z-index: 10;
	width: 100%;
	max-width: 120px;

	img {
		width: 100%;
	}
`;

export const Content = styled.div`
	position: relative;
	padding-left: 20px;
	width: 100%;

	button {
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		background: none;
	}

	span {
		color: #cc0000;
		font-size: 12pt;
	}

	a {
		cursor: pointer;
		outline: none;
		font-size: 16px;
		position: relative;
		color: inherit;
		text-decoration: none;
		transition: all 0.4s ease;
	}

	p {
		font-size: 16px;
		color: #999;
		margin-bottom: 0;
		line-height: 1.6;
	}
`;

export const CartFooter = styled.div`
	padding-top: 50px;
	margin-top: 50px;
	border-top: 1px solid #eaeaea;

	h3 {
		display: block;
		font-size: 18px;
		font-weight: 600;
		text-transform: capitalize;
		color: #222;
		line-height: 30px;
		margin-top: 0;
		position: relative;

		strong {
			float: right;
			color: #c00;
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 2rem;
		}
	}

	button {
		margin-bottom: 10px;
		padding: 12px 30px;
		text-align: center;
		width: 100%;

		&:last-child {
			margin-bottom: unset;
		}
	}
`;
