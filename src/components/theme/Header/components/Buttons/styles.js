import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
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
		padding-right: 0;
		padding-left: 0;

		&:last-child {
			margin-right: 0;
		}
	}

	button {
		border: none;
		cursor: pointer;
		background: none;

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
	cursor: pointer;
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
