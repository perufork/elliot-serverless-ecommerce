import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Search = styled.div`
	padding-right: 100px;

	@media (min-width: 1200px) {
		padding-right: 0;
	}

	@media (min-width: 1366px) {
		padding-right: 100px;
	}
`;

export const Form = styled.form`
	position: relative;

	input {
		outline: none;
		padding: 0 20px 0 0;
		height: 40px;
		border: none;
		font-size: 15px;
		border-bottom: 1px solid transparent;
		width: 100%;
		box-shadow: 0 0 0 transparent;
		background-color: transparent;
		display: block;
		line-height: 1.5;
		color: #495057;

		&::placeholder {
			color: #bbbbbb;
			font-size: 15px;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 #000;
			border-color: #222;
			border-bottom-color: #bbb;
		}
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		border: none;
		background-color: transparent;
		width: 40px;
		height: 40px;
	}
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	a,
	button {
		display: flex;
		width: 40px;
		height: 40px;
		justify-content: center;
		align-items: center;
		vertical-align: top;
		width: 40px;
		font-size: 22px;
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}

	button {
		border: none;
		cursor: pointer;

		&:focus {
			outline: none;
		}
	}
`;

export const Cart = styled.a`
	position: relative;
	display: flex;
	height: 40px;
	justify-content: center;
	align-items: center;
	vertical-align: top;
	width: 40px;
	font-size: 22px;
	margin-right: 4px;
`;

export const CartItems = styled.span`
	position: absolute;
	top: 0;
	right: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	vertical-align: top;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: #f68773;
	font-size: 10px;
	color: #ffffff;
`;
