import styled from "styled-components";

export const Thumbnail = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;

	a {
		display: block;
		height: 100%;
		width: 100%;
	}

	img {
		width: 100%;
		transition: all 0.4s cubic-bezier(0.7, 0, 0.3, 1);
		opacity: 1;
		float: left;
		width: 270px;
		height: 270px;
		background-size: cover;

		@media (max-width: 680px) {
			width: 345px;
			height: 345px;
		}

		&.secondary {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	div {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.3rem 0 0;
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		transition: all 0.75s cubic-bezier(0.77, 0, 0.175, 1);
		transform: translateY(100%);

		button {
			font-size: 10pt;
			text-transform: uppercase;
			font-weight: 500;
			align-self: center;
			border: none;
			background: none;
			color: ${({
				theme: {
					colors: { black }
				}
			}) => black};

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}
		}

		ul {
			li {
				display: inline-block;

				&:first-child {
					margin-right: 10px;
				}
			}
		}
	}

	&:hover {
		div {
			transform: translateY(0);
		}

		img {
			&:first-child {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
			&.secondary {
				opacity: 1;
				position: unset;
			}
		}
	}
`;

export const Details = styled.div`
	h2 {
		font-size: 12pt;
		font-weight: 500;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: unset;
		font-size: 10pt;
		font-weight: 400;
		margin-top: 0.6rem;
		color: ${({ theme: { colors } }) => colors.lightGray};

		span {
			margin-right: 0.04rem;
		}
	}
`;

export const Body = styled.div`
	padding: 2rem 0;

	p {
		line-height: 1.6em;
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const Footer = styled.div`
	text-align: left;
`;
