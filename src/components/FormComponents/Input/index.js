import { useField } from "formik";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React from "react";

import { FormElement } from "../FormElement/index.styled";
import { StyledInput, StyledErrorMessage } from "./index.styled";

function Input({
  label,
  type,
  tooltip,
  id,
  onBlur,
  maxWidth,
  flexSize,
  colorForTooltip,
  ...props
}) {
  const [field, meta] = useField(props);
  if (field.value === null || field.value === undefined) {
    field.value = "";
  }

  return (
    <FormElement flexSize={flexSize} className={!isEmpty(meta.error) ? "error-msg-visible" : ""}>
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
      </div>

      <StyledInput
        id={id}
        data-testid={id}
        // type={type}
        error={meta.touched && meta.error}
        {...field}
        {...props}
        onBlur={(e) => {
          field.onBlur(e);
          if (
            onBlur &&
            meta.error === undefined &&
            meta.initialValue !== meta.value
          ) {
            onBlur(e);
          }
        }}
      />
      <StyledErrorMessage>
        {meta.touched && meta.error ? <p data-testid={`${field?.name}-error`}>{meta.error}</p> : null}
      </StyledErrorMessage>
    </FormElement>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  maxWidth: PropTypes.string,
};

Input.defaultProps = {
  label: "",
  type: "text",
  id: "",
  onBlur: undefined,
  maxWidth: null,
};

export default Input;
