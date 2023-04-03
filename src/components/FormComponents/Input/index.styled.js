import styled from "styled-components";

export const StyledInput = styled.input`
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.error
      ? props.theme.colors.variations.danger
      : props.theme.colors.grayscale.gray3};
  color: ${(props) => props.theme.colors.font.dark};
  border-radius: 4px;
  height: 36px;
  padding: 2px 8px;
  font-size: 14px;
  &:focus {
    outline: 0;
  }
  &:disabled {
    background-color: #f2f2f2;
  }
`;

export const StyledErrorMessage = styled.div`
  height: 20px;
  p {
    font-size: 12px;
    color: ${(props) => props.theme.colors.variations.danger};
    margin-bottom: 0;
    margin-top: 3px;
  }
`;
