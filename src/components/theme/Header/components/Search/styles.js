import styled from "styled-components";

export const Wrapper = styled.div`
	padding-right: 100px;

	@media (min-width: 1200px) {
		padding-right: 10px;
	}

	@media (min-width: 1366px) {
		padding-right: 100px;
	}

	@media (max-width: 960px) {
		padding-right: 4px;
	}
`;

export const StyledForm = styled.form`
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

		@media (max-width: 960px) {
			display: none;
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

		@media (max-width: 960px) {
			position: unset;
			top: unset;
			transform: unset;
			right: unset;
		}
	}
`;
