import styled from "styled-components";

const Swatch = styled.div`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: ${({ color }) => color || "#222"};
	border: 2px solid #eaeaea;
`;

export default Swatch;
