import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 100px;
`;

export const FiltersWrapper = styled.div`
	display: flex;
	align-items: center;

	*:last-child {
		padding-right: 0;
	}
`;

export const Products = styled.section`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 30px;
	grid-row-gap: 65px;

	${({ grid }) =>
		!grid &&
		`
		grid-template-columns: 1fr;
  `}
`;
