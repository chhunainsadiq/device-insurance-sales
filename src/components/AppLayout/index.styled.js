import styled, { createGlobalStyle } from "styled-components";

import { screenSizes } from "../../services/general/constants";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f2f6fa;
    margin: 0 auto;
    overflow: hidden;
    box-sizing:border-box;
    font-family: ${(props) =>
      props.theme
        .fontFamilies.primary}, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

    @media only screen and (max-width: ${`${screenSizes.sm}px`}) { 
      margin: 0;
      padding : 0;

    }
  }

  a:hover{
    text-decoration: none;
  }
`;

export const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.colors.grayscale.gray6};
  height: 100vh;
  width: 100%;
  padding: 8px;
  direction: ltr;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  margin: 0 auto;
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
`;
