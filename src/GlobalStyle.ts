import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, p, span, button, p {
    font-family: 'DM Sans', sans-serif;
  }
`;

export default GlobalStyle;
