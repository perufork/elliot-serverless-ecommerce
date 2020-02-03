import styled from "styled-components";

export const Wrapper = styled.div`
	.react-tabs__tab-list {
		position: relative;
		display: block;
		width: 100%;
		margin: 0 0 100px;
		padding: 20px 0;
		border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
		text-align: center;
		list-style: none;
	}

	.react-tabs__tab {
		display: inline-block;
		position: relative;
		padding: 10px 30px;
		margin-right: 10px;
		line-height: 20px;
		font-weight: 700;
		font-size: 20px;
		color: #999;
		border-radius: 50px;
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 400ms ease;
	}

	.react-tabs__tab--selected {
		color: #000;
	}
`;
