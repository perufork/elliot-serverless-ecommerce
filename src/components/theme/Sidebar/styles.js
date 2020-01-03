import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
	overflow: scroll;
	height: 100%;
	color: #000;

	ul:not(:last-child) {
		border-bottom: 1px solid rgba(214, 214, 214, 0.2);
		padding-bottom: 1.5rem;
	}

	a {
		white-space: nowrap;
	}

	h3 {
		font-weight: 400;
		margin: 0;
	}
`;

export const Overlay = styled.div`
	display: none;

	${({ visible }) =>
		visible &&
		`
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    z-index: 2;
  `}
`;

export const Nav = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	max-width: 470px;
	height: 100vh;
	overflow-y: auto;
	z-index: 10001;
	background-color: #fff;
	transform: translateX(100%);
	border-left: 1px solid #eaeaea;
	transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1) 0s;

	${({ visible }) =>
		visible &&
		`
    transform: translateX(0);
  `}

	li {
		margin-left: 0;
		width: 250px;
		transition: all 0.3s ease-in;
	}
`;

export const Burger = styled.div`
	padding: 2rem 0;
	width: 100%;
`;

export const Bar = styled.div`
	transition: all 0.3s ease-in;
	border-top: 2px solid;
	box-sizing: border-box;
	cursor: pointer;
	height: 20px;
	left: 3rem;
	position: fixed;
	top: 26px;
	width: 25px;
	z-index: 30;
	background: #fff;
	border-top-color: transparent;

	@media screen and (max-width: 576px) {
		left: 0.5rem;
	}

	&:before {
		background-color: #000;
		transition: all 0.3s ease-in;
		content: "";
		display: block;
		height: 2px;
		transform: rotate(45deg);
		left: -2px;
		width: 28px;
		position: absolute;
		top: 7px;
	}

	&:after {
		background-color: #000;
		transition: all 0.3s ease-in;
		bottom: 0;
		content: "";
		display: block;
		height: 2px;
		position: absolute;
		transform: rotate(135deg);
		bottom: 9px;
		left: -2px;
		width: 28px;
	}
`;

export const Content = styled.div`
	height: 100%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	padding: 50px;
`;

export const Navigation = styled.div`
	ul {
		padding-inline-start: unset;

		li {
			a {
				display: block;
				color: #999;
				line-height: 20px;
				text-decoration: none;

				&:hover {
					color: ${({
						theme: {
							colors: { accent }
						}
					}) => accent};
				}

				&.active {
					color: ${({
						theme: {
							colors: { accent }
						}
					}) => accent};
				}
			}
		}
	}
`;

export const DesktopMenu = styled.ul`
	display: block;

	li {
		list-style: none;
		padding: 15px 0;

		a {
			font-size: 36px;
			font-weight: 600;
			color: #999999;
			text-decoration: none;

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

export const Menu = styled.div`
	padding-bottom: 60px;
`;

export const Options = styled.ul`
	display: block;
	padding-bottom: 60px;
`;

export const MenuBottom = styled.div`
	figcaption {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 600;
		color: #222;
	}

	p {
		font-size: 16px;
		line-height: 1.6em;
		color: #999;
	}
`;

export const List = styled.ul`
	li {
		padding: 10px 0;
		list-style: none;

		a {
			display: block;
			color: #999;
			line-height: 20px;
			font-size: 16px;

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}

			&.active {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}
		}
	}
`;
