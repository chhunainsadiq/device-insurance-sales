import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.styletype === "primary"
      ? props.theme.colors.primary
      : props.theme.colors.variations.light};
  color: ${(props) =>
    props.styletype === "primary" ? props.theme.colors.font.light : null};
  color: ${(props) =>
    props.styletype === "secondary" ? props.theme.colors.font.dark : null};
  color: ${(props) =>
    props.styletype === "bordered" ? props.theme.colors.primary : null};
  color: ${(props) =>
    props.styletype === "danger" ? props.theme.colors.variations.danger : null};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.styletype === "secondary"
      ? props.theme.colors.grayscale.gray5
      : null};
  border-color: ${(props) =>
    props.styletype === "bordered" ? props.theme.colors.primary : null};
  border-color: ${(props) =>
    props.styletype === "danger" ? props.theme.colors.variations.danger : null};
  border: ${(props) => (props.styletype === "primary" ? "0" : null)};
  min-width: ${(props) => (props.width === "normal" ? "120px" : null)};
  min-height: ${(props) => (props.size === "normal" ? "40px" : null)};
  height: ${(props) => (props.size === "small" ? "32px" : null)};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
  &:active {
    outline: 0;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.grayscale.gray4};
    color: ${(props) => props.theme.colors.grayscale.gray3};
    border: none;
    cursor: null;
  }

`;
