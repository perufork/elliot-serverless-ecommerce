import styled from "styled-components";

export const Wrapper = styled.footer`
	margin-top: 95px;

	ul {
		list-style: none;
	}

	a {
		color: #999;
		position: relative;
		display: inline-block;
		padding: 5px 0;
		line-height: 20px;
		transition: all 400ms ease;
		text-decoration: none;
		background-color: transparent;
	}

	a:hover {
		color: #222;
	}

	a:before {
		content: "";
		position: absolute;
		bottom: 2px;
		width: 100%;
		height: 1px;
		background-color: #000;
		transition: all 0.4s cubic-bezier(0.7, 0, 0.3, 1);
		transform: scale3d(0, 1, 1);
		transform-origin: 0% 50%;
	}

	a:hover:before {
		transform-origin: 100% 50%;
		transform: scale3d(1, 1, 1);
	}
`;

export const Navigation = styled.nav`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	max-width: 1200px;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	padding-bottom: 50px;

	@media (max-width: 960px) {
		grid-template-columns: repeat(2, 1fr);
		grid-row-gap: 50px;
		grid-column-gap: 20px;
	}
`;

export const List = styled.ul`
	margin: 0;
	padding: 0;
`;

export const Item = styled.li`
	font-size: 11.25pt;
	line-height: 22px;
	color: #999;
`;

export const ListTitle = styled.li`
	font-size: 10.5pt;
	margin-bottom: 40px;
	font-weight: 700;
	text-transform: uppercase;

	@media (max-width: 960px) {
		margin-bottom: 30px;
	}
`;

export const Separator = styled.hr`
	border: none;
	height: 1px;
	background-color: #eaeaea;
`;

export const CopyWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	p {
		font-size: 10.5pt;
		line-height: 40px;
		color: #999;

		span {
			color: #000;
			font-weight: 700;
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	ul li {
		display: inline-block;
		font-size: 11.25pt;
		line-height: 40px;
	}

	ul li:not(:last-child) {
		margin-right: 15px;
	}

	@media (max-width: 960px) {
		flex-wrap: wrap;
		margin: 20px auto;

		p {
			margin: 0;
		}
	}
`;
