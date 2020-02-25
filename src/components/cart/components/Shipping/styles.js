import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 370px;
	width: 100%;
`;

export const SubTotal = styled.div`
	padding: 30px;
	border: 1px solid #eaeaea;

	h4,
	span {
		font-size: 14px;
		font-weight: 600;
		color: #222;
	}

	h4 {
		border-bottom: 1px solid #eaeaea;
		margin-bottom: 30px;
		padding-bottom: 30px;
		line-height: 1em;
	}
`;

export const Total = styled.div`
	h3,
	span {
		margin-bottom: 0;
		display: flex;
		justify-content: space-between;
		font-size: 18px;
		font-weight: 600;
		color: #222;
	}
`;

export const Flex = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Shipping = styled.div`
	padding-bottom: 20px;

	h5 {
		display: inline-block;
		margin-bottom: 20px;
		font-size: 14px;
		font-weight: 600;
		color: #222;
	}
`;

export const Country = styled.div`
	margin-bottom: 30px;
	padding-bottom: 30px;
	border-bottom: 1px solid #eaeaea;

	h5,
	span {
		position: relative;
		display: inline-block;
		font-size: 14px;
		font-weight: 600;
		color: #222;
	}

	h5 {
		margin-bottom: 20px;
		padding-bottom: 5px;

		&:after {
			content: "";
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			height: 2px;
			border-radius: 4px;
			background-color: #222;
		}
	}
`;

export const FormField = styled.div`
	margin-bottom: 2.5rem;

	span {
		font-weight: normal;
		font-size: 12px;
		color: #e53935;
		display: block;
		margin-top: 0.2rem;
	}
`;
