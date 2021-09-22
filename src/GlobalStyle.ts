import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
  body {
    padding: 0;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
`;

export default GlobalStyle;
