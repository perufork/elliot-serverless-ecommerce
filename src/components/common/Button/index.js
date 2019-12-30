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

	${({
		variant,
		theme: {
			button: {
				variants: { primary }
			}
		}
	}) =>
		// TODO: add a helper to handle variants
		variant === "primary" &&
		`
    color: ${primary.color};
    background: ${primary.bg};

    &:hover {
      background: ${primary.hover.bg}
    }
  `} /* &--rounded {
      border-radius: 50px;
  }

  &--curve {
      border-radius: 5px;
  } */

  /* &--outline {
      padding: 15px 36px;
      font-size: 14px;
      color: $color-heading;
      border: 2px solid #222;
      text-transform: uppercase;
      background-color: transparent;

      &:hover {
          background-color: $color-1st;
          border-color: $color-1st;
          color: #ffffff;
      }
  } */

  /* &--fullwidth {
      width: 100%;
      text-align: center;
  } */

  /* &--sm {
      padding: .5rem 2rem;
      font-size: 1.2rem;

      &.ps-btn--curve {
          border-radius: 3px;
      }
  }

  &--lg {
      padding: 1.5rem 4rem;
  }

  &--xl {
      padding: 2rem 6rem;
      font-size: 1.6rem;
  }

  &--reverse {
      background-color: #576391;

      &:hover {
          background-color: $color-2nd;
      }
  }

  &--gray {
      background-color: #e5e5e5;
      color: #000000;
      font-size: 1.6rem;
  }

  &--black {
      background-color: $color-heading;

      &.ps-btn--outline {
          background-color: transparent;
          border: 2px solid $color-heading;
          color: $color-heading;

          &:hover {
              background-color: $color-heading;
              color: #ffffff;
          }
      }
  }

  &:hover, &:active {
      color: #fff;
      background-color: $color-1st;

      &.ps-btn--black {
          background-color: $color-1st;
      }
  } */
`;

export default Button;
