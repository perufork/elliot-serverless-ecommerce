import styled from "styled-components";

export const FieldWrapper = styled.div`
	margin-bottom: 1.5rem;

	label {
		color: #777;
		font-size: 16px;
		margin-bottom: 1rem;
		font-weight: 400;
		display: inline-block;
	}
`;

export const CreditCardWrap = styled.div`
	display: flex;
	align-items: center;

	> div {
		width: 100%;
		border: 2px solid #eaeaea;
		padding: 1.5rem 1rem;
	}

	.shipping-preference-label .loader--simple {
		margin-left: 10px;
	}

	.checkout-button.ps-btn--black:not(:disabled) {
		background-color: #32aa44;
	}
`;
