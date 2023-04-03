import styled from "styled-components";

export const StyledSelect = styled.div`
  .formik-select {
    outline: 0;
    box-shadow: none;
    border-color: ${(props) =>
      props.error || props.outsideError
        ? props.theme.colors.variations.danger
        : props.theme.colors.grayscale.gray3} !important;
    font-size: 14px;
  }

  .formik-select-placeholder {
    font-size: 14px;
  }

  .formik-select-menulist {
    padding: 0;
  }

  .formik-select-single-value {
    color: ${(props) => props.theme.colors.font.dark};
  }

  .formik-select-option {
    font-size: 14px;
    color: ${(props) => props.theme.colors.primary};
    &.focused {
      background-color: ${(props) => props.theme.colors.grayscale.gray4};
      color: ${(props) => props.theme.colors.primary};
    }
    &.selected,
    &.selected:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.font.light};
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.grayscale.gray4};
      color: ${(props) => props.theme.colors.primary};
    }
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
