import styled from "styled-components";

export const Wrapper = styled.div`
	list-style: none;
	position: relative;
	cursor: pointer;
	padding: 0;
	margin: 0 30px;
	${({ standalone }) =>
		standalone &&
		`
		max-width: 70%;
		margin: 0;
	`}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
`;

export const Label = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 16px;
	font-weight: 600;
`;

export const List = styled.ul`
	position: absolute;
	top: 130%;
	right: 0;
	width: 100%;
	background-color: #fff;
	border: 1px solid #999;
`;

export const Arrow = styled.span`
	margin: 0 10px;
`;

export const Item = styled.li`
	font-size: 16px;
	padding: 6px 16px;
	line-height: 1.5;
	transition: all 200ms ease;

	&:hover {
		color: #fff;
		background-color: #f68773;
	}
`;

export const DefaultValue = styled.p`
	font-size: 16px;
	color: #999;
	min-width: 60px;
	text-align: center;
	margin: 0 0 0 5px;
`;
