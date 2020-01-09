import styled from "styled-components";

const Button = styled.button`
	display: ${({ theme: { button } }) => button.display};
	padding: ${({ theme: { button } }) => button.padding};
	font-size: ${({ theme: { button } }) => button.fontSize};
	font-weight: ${({ theme: { button } }) => button.fontWeight};
	line-height: ${({ theme: { button } }) => button.lineHeight};
	border: ${({ theme: { button } }) => button.border};
	transition: ${({ theme: { button } }) => button.transition};
	text-transform: ${({ theme: { button } }) => button.textTransform};
	cursor: ${({ theme: { button } }) => button.cursor};

	&:hover {
		transition: ${({ theme: { button } }) => button.transition};
	}

	${({ wide }) =>
		wide &&
		`
      width: 100%;
      text-align: center;
    `}

    ${({ marginBottom }) =>
			marginBottom &&
			`
        margin-bottom: ${marginBottom}rem;
    `}

	${({
		variant,
		theme: {
			button: {
				variants: { primary, secondary }
			}
		}
	}) => {
		switch (variant) {
			case "primary":
				return `
                        color: ${primary.color};
                        background: ${primary.bg};

                        &:hover {
                            background: ${primary.hover.bg};
                        }
                    `;
			case "secondary":
				return `
                        color: ${secondary.color};
                        background: ${secondary.bg};
                        border: ${secondary.border};

                        &:hover {
                            background: ${secondary.hover.bg};
                            color: ${secondary.hover.color};
                            border-color: ${secondary.hover.bg};
                        }
                    `;
			default:
				return null;
		}
	}}
`;

export default Button;
