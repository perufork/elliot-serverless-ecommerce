import styled from "styled-components";

export const Wrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	padding: 4rem 0;
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
