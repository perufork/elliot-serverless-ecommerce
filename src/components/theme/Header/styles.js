import styled from "styled-components";

export const Wrapper = styled.div`
	border-bottom: 1px solid #eaeaea;
	width: 100%;
	z-index: 1;
	background-color: #fff;
	padding: 1rem;
	transition: all 200ms ease;

	&.sticky {
		position: fixed;
		top: 0;
		left: 0;
		padding-top: 0;
		padding-bottom: 0;
	}

	ul,
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
	padding-left: 50px;
	justify-content: space-between;
	align-items: center;

	@media (min-width: 1680px) {
		padding-left: 170px;
	}

	@media (min-width: 1200px) {
		flex: 2 1 100%;
	}
`;
