import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 100px;

	@media (max-width: 1200px) {
		flex-direction: column;
		align-items: flex-start;
		padding-bottom: 0;
	}
`;

export const FiltersWrapper = styled.div`
	display: flex;
	align-items: center;

	*:last-child {
		padding-right: 0;
	}

	@media (max-width: 1200px) {
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;

export const Result = styled.div`
	font-size: 16px;
	color: #999;

	span {
		font-weight: 600;
		margin-right: 5px;
		color: #000;
	}
`;

export const Filters = styled.div`
	display: flex;
	margin-right: 30px;

	@media (max-width: 600px) {
		display: none;
	}
`;

export const Products = styled.section`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 30px;
	grid-row-gap: 65px;

	@media (max-width: 680px) {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: unset;
	}

	${({ grid }) =>
		!grid &&
		`
		grid-template-columns: 1fr;
  `}
`;
