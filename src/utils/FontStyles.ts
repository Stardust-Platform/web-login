import { createGlobalStyle } from 'styled-components';
import DMSansTFF from '../assets/fonts/DMSansRegular.ttf';

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansTFF}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: auto;
  }
`;

export default FontStyles;
