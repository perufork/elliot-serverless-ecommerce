import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	@media (max-width: 600px) {
		max-width: 50px;
		margin-left: 15px;
	}
`;
