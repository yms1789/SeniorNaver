import { createGlobalStyle } from "styled-components";
import NanumSquareNeoLight from "../assets/fonts/NanumSquareNeo-aLt.ttf";
import NanumSquareNeoRegular from "../assets/fonts/NanumSquareNeo-bRg.ttf";
import NanumSquareNeoBold from "../assets/fonts/NanumSquareNeo-cBd.ttf";
import NanumSquareNeoExtraBold from "../assets/fonts/NanumSquareNeo-dEb.ttf";
import NanumSquareNeoHeavy from "../assets/fonts/NanumSquareNeo-eHv.ttf";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "NanumSquareNeoBold", "NanumSquareNeoRegular", sans-serif;
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
    background-color: transparent;
    padding: 0;
    &:focus{
      border-color: none;
      outline: none;
    }
  }
  ul {
    margin: 0;
  }
/* 
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
  } */

  :root {

/* Colors */
--dark01: #010101;
--dark02: #202020;
--dark10: rgba(1, 1, 1, 0.1);
--dark30: rgba(1, 1, 1, 0.3);
--dark50: rgba(1, 1, 1, 0.5);
--dark70: rgba(1, 1, 1, 0.7);
--white: #ffffff;
--white30: rgba(255, 255, 255, 0.3);
--white50: rgba(255, 255, 255, 0.5);
--white70: rgba(255, 255, 255, 0.7);
--white90: rgba(255, 255, 255, 0.9);
--gray01: #4a4a4a;
--gray02: #6c6c6c;
--gray03: #d9d9d9;
--gray04: #EAEAEA;
--gray05: #6C6C6C;
--gray06: #cfcfcf;
--red: #F33434;
--aqua: #3FD5DE;
--aqua01: #EBFBFC;
--aqua02: #98E3E8;
--emerald: #2deea8;
--maingradient: linear-gradient(100deg, #3fd5de, #2deea8);
--decogradient01: linear-gradient(152.33deg, #cc85f5 6.96%, #ff7171 88.63%);
--decogradient02: linear-gradient(152.33deg, #d46fff 6.96%, #ecff21 88.63%);
  }
  
`;
