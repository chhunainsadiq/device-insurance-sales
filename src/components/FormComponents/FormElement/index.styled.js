import styled from "styled-components";

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-right: 16px;
  flex: ${(props) => props.flexSize ? props.flexSize : 1};

  label {
    font-size: 14px;
    color: ${(props) => props.theme.colors.grayscale.gray2};
    margin-bottom: 0;
    word-break: break-word;
    text-align: "left";
  }

  .label-row {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    label {
      color: ${(props) => props.theme.colors.grayscale.gray2};
      margin-bottom: 0;
    }
  }

  .error-msg {
    height: 20px;
    p {
      font-size: 12px;
      color: ${(props) => props.theme.colors.variations.danger};
    }
  }
`;

