import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 120px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border: 2px solid #eaeaea;

	${({ wide }) =>
		wide &&
		`
		max-width: 150px;
		margin: 0;
		margin-right: auto;

		@media (max-width: 960px) {
			max-width: 100%;
		}
	`}

	input {
		border: none;
		height: 45px;
		max-width: calc(100% - 64px);
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		color: #222;
		background-color: transparent;
		outline: none;
		transition: all 0.4s ease;
		display: block;

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
