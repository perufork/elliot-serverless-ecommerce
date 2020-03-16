import styled from "styled-components";

export const Products = styled.section`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 1.875rem;
	grid-row-gap: 4.0625rem;

	@media (max-width: 770px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 400px) {
		grid-template-columns: 1fr;
	}

	${({ grid }) =>
		!grid &&
		`
		grid-template-columns: 1fr;
	`}
`;

export const Section = styled.section`
	padding: 2.5rem 0;
	max-width: 90%;
`;

export const SectionTitle = styled.h3`
	text-align: center;
	font-weight: 700;
`;
