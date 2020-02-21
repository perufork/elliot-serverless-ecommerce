import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #eaeaea;
	width: 100%;
	z-index: 6;
	background-color: #fff;
	padding: 1rem;
	transition: all 200ms ease;
	position: fixed;
	top: 0;
	left: 0;

	ul {
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 1200px) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
	}

	@media (min-width: 1440px) {
		padding: 0 60px;
	}

	@media (min-width: 1680px) {
		padding: 10px 80px;
	}

	@media (max-width: 1200px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20px;
	}
`;

export const Options = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
