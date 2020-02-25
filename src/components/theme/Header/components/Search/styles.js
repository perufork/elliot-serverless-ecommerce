import styled from "styled-components";

export const Wrapper = styled.div`
	padding-right: 6.25rem;

	@media (min-width: 1200px) {
		padding-right: 0.625rem;
	}

	@media (min-width: 1366px) {
		padding-right: 6.25rem;
	}

	@media (max-width: 960px) {
		padding-right: 0.25rem;
	}
`;

export const StyledForm = styled.form`
	position: relative;

	input {
		outline: none;
		padding: 0 1.25rem 0 0;
		height: 2.5rem;
		border: none;
		font-size: 15px;
		border-bottom: 1px solid transparent;
		width: 100%;
		box-shadow: 0 0 0 transparent;
		background-color: transparent;
		display: block;
		line-height: 1.5;
		color: #495057;
		transition: ${({ theme: { transitions } }) => transitions.default400};

		&::placeholder {
			color: ${({ theme: { colors } }) => colors.lightGray};
			font-size: 15px;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 ${({ theme: { colors } }) => colors.darkBlack};
			border-color: ${({ theme: { colors } }) => colors.black};
			border-bottom-color: ${({ theme: { colors } }) => colors.lightGray};
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
		width: 2.5rem;
		height: 2.5rem;

		@media (max-width: 960px) {
			position: unset;
			top: unset;
			transform: unset;
			right: unset;
		}
	}
`;
