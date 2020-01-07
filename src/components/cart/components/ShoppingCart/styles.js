import styled from "styled-components";

export const Center = styled.div`
	text-align: center;

	h2 {
		font-size: 24pt;
	}
`;

export const TableWrapper = styled.div`
	@media (min-width: 1200px) {
		overflow-x: initial;
	}

	button {
		background: none;
		border: none;
	}
`;

export const Table = styled.table`
	margin: 0 auto;
	border-collapse: collapse;

	tr {
		td {
			padding: 10px 20px;
			border: none;

			a {
				display: block;
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

			span {
				color: ${({
					theme: {
						colors: { black }
					}
				}) => black};

				del {
					color: #eee;
					margin-left: 10px;
				}
			}

			&:nth-child(2) {
				min-width: 230px;
			}

			&:last-child {
				text-align: right;
			}
		}
	}

	strong {
		font-weight: 500;
		color: ${({
			theme: {
				colors: { black }
			}
		}) => black};
	}
`;

export const Product = styled.div`
	align-items: center;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
`;

export const Thumbnail = styled.div`
	max-width: 70px;
	margin-right: 1rem;

	@media (min-width: 768px) {
		margin-bottom: 0;
		max-width: 500px;
	}

	@media (min-width: 1200px) {
		max-width: calc(40% - 70px);
	}

	img {
		width: 100%;
		transition: all 0.8s ease;
	}
`;

export const Content = styled.div`
	a {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 600;
		color: ${({
			theme: {
				colors: { black }
			}
		}) => black};
		font-size: 15px;
	}
`;

export const QuantityController = styled.div`
	max-width: 120px;
	display: flex;
	align-items: center;
	border: 2px solid #eaeaea;

	input {
		border: none;
		height: 45px;
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		color: #222;
		background-color: transparent;
		outline: none;
		transition: all 0.4s ease;
		display: block;
		width: 50px;

		&::placeholder {
			color: #222;
		}
	}
`;

export const Controller = styled.button`
	font-size: 30px;
	border: none;
	background: none;
`;

export const Thead = styled.thead`
	display: table-header-group;
	vertical-align: middle;
	border-color: inherit;

	tr {
		th {
			text-align: left;
			font-size: 12px;
			font-weight: 600;
			color: #ccc;
			border: none;
			text-transform: uppercase;
			border-bottom: 1px solid #eaeaea;

			&:last-child {
				text-align: right;
			}

			&:first-child {
				padding-left: 0;
			}
		}
	}
`;

export const Tbody = styled.tbody`
	tr {
		td {
			padding: 30px 15px;
			border: none;
			vertical-align: middle;
			font-size: 14px;
			font-weight: 600;
			color: #999;
			border-bottom: 1px solid #ddd;

			&:first-child {
				min-width: 350px;
				padding-left: 0;
			}

			&:last-child {
				text-align: right;

				a {
					font-size: 24px;

					i {
						font-size: inherit;
					}
				}
			}
		}
	}
`;
