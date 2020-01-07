import styled from "styled-components";

export const Menu = styled.ul`
	@media screen and (max-width: 1200px) {
		display: none;
	}

	li {
		display: inline-block;
		padding-right: 40px;

		a {
			position: relative;
			display: inline-block;
			padding: 30px 0;
			font-size: 16px;
			font-weight: 400;
			line-height: 20px;
			color: ${({
				theme: {
					colors: { black }
				}
			}) => black};
			text-transform: capitalize;
			transform-style: preserve-3d;

			&:after {
				content: "";
				position: absolute;
				bottom: 20px;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: ${({
					theme: {
						colors: { black }
					}
				}) => black};
				transform: scale3d(0, 1, 1);
				transform-origin: 100% 50%;
				transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1);
			}

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};

				&:after {
					transform-origin: 0 50%;
					transform: scale3d(1, 1, 1);
				}
			}
		}

		&:first-child {
			padding-left: 0;
		}

		&:last-child {
			margin-right: 0;
			padding-right: 0;
		}

		@media screen and (max-width: 1199px) {
			li {
				display: block;
				padding-right: 0;
				border-bottom: 1px dashed #e4e4e4;

				a {
					display: block;
					color: ${({
						theme: {
							colors: { black }
						}
					}) => black};
					font-size: 1.5rem;
					padding: 1rem 0;
					line-height: 20px;
				}
			}
		}
	}
`;
