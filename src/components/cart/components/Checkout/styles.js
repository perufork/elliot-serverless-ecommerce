import styled from "styled-components";

export const Wrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	padding-top: 50px;
	border-top: 1px solid #eaeaea;

	@media (min-width: 768px) {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
`;

export const Actions = styled.div`
	max-width: 370px;
	width: 100%;

	.form-group {
		label {
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: 600;
			color: #222;
		}

		input {
			border: 2px solid #eaeaea;
			&::placeholder {
				color: #ccc;
			}
		}

		.form-group__content {
			position: relative;

			a {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 20px;
				font-size: 12px;
				font-weight: 600;
				text-transform: uppercase;
				color: #222;

				&:hover {
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

export const Flex = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 50px;

	a:first-child {
		margin-right: 0.5rem;
	}
`;
