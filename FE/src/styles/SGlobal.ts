import { createGlobalStyle } from "styled-components";
import NanumSquareNeoLight from "..assets/fonts/NanumSquareNeo-aLt.ttf";
import NanumSquareNeoRegular from "..assets/fonts/NanumSquareNeo-bRg.ttf";
import NanumSquareNeoBold from "..assets/fonts/NanumSquareNeo-cBd.ttf";
import NanumSquareNeoExtraBold from "..assets/fonts/NanumSquareNeo-dEb.ttf";
import NanumSquareNeoHeavy from "..assets/fonts/NanumSquareNeo-eHv.ttf";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
  button {
    &:focus{
      outline: none;
    }
  }
  @font-face {
        font-family: 'NanumSquareNeoLight';
        src: local('NanumSquareNeoLight'), local('NanumSquareNeoLight');
        font-style: normal;
        src: url(${NanumSquareNeoLight}) format('truetype');
  }
  @font-face {
        font-family: 'NanumSquareNeoRegular';
        src: local('NanumSquareNeoRegular'), local('NanumSquareNeoRegular');
        font-style: normal;
        src: url(${NanumSquareNeoRegular}) format('truetype');
  }
  @font-face {
        font-family: 'NanumSquareNeoBold';
        src: local('NanumSquareNeoBold'), local('NanumSquareNeoBold');
        font-style: normal;
        src: url(${NanumSquareNeoBold}) format('truetype');
  }
  @font-face {
        font-family: 'NanumSquareNeoExtraBold';
        src: local('NanumSquareNeoExtraBold'), local('NanumSquareNeoExtraBold');
        font-style: normal;
        src: url(${NanumSquareNeoExtraBold}) format('truetype');
  }
  @font-face {
        font-family: 'NanumSquareNeoHeavy';
        src: local('NanumSquareNeoHeavy'), local('NanumSquareNeoHeavy');
        font-style: normal;
        src: url(${NanumSquareNeoHeavy}) format('truetype');
  }
`;
