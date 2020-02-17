import styled from "styled-components";

export const Navigation = styled.div`
	ul {
		padding-inline-start: unset;

		li {
			a {
				display: block;
				color: #999;
				line-height: 20px;

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
	position: relative;

	li {
		list-style: none;
		padding: 15px 0;

		a {
			font-size: 36px;
			font-weight: 600;
			color: #999999;

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

export const Options = styled.div`
	display: flex;
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
	max-width: 200px;

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
