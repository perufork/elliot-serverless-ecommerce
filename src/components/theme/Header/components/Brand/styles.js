import styled from "styled-components";

export const Wrapper = styled.div`
	width: 3.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	flex: 0;

	@media (max-width: 1200px) {
		margin-left: 0.9375rem;
	}

	@media (max-width: 960px) {
		margin-left: 0;
	}
`;
