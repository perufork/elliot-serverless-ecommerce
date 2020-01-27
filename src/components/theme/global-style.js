import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
  }

  img {
    user-select: none;
  }

  button {
    cursor: pointer;

    &:hover {
      outline: none;
    }
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
