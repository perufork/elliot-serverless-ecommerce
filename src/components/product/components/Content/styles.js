import styled from "styled-components";

export const Wrapper = styled.div`
	padding: 2rem 0;

	.item__container {
		&--carousel {
			padding-right: 30px;
		}
		&--details {
			padding-left: 100px;
		}
	}

	@media (max-width: 960px) {
		.item__container {
			padding: 0;
		}
	}
`;
