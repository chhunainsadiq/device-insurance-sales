import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import {
  Control,
  Placeholder,
  SingleValue,
  MenuList,
  Option,
} from "./components/index";
import { FormElement } from "../FormElement/index.styled";
import { StyledSelect, StyledErrorMessage } from "./index.styled";

function FormikSelect({
  label,
  id,
  options,
  onBlur,
  onChange,
  isCreatable,
  className,
  valueBased,
  outsideError,
  overflow,
  maxWidth,
  flexSize,
  isPlaceholder,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  return (
    <FormElement flexSize={flexSize} className={className}>
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
      </div>
      <StyledSelect
        error={(meta.touched && meta.error) || outsideError}
        data-testid={id}
      >
        <Select
          menuPosition={overflow ? "fixed" : "absolute"}
          menuPlacement="auto"
          {...props}
          {...field}
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
          onChange={async (e) => {
            await helpers.setValue(e);
            if (onChange) {
              onChange(e);
            }
          }}
          inputId={id}
          data-testid={id}
          options={options}
          formatGroupLabel={(data) => (
            <span style={{ textTransform: "initial" }}>{data.label}</span>
          )}
          components={{
            Control,
            Placeholder: (controlProps) => (
              <Placeholder {...controlProps} isPlaceholder={isPlaceholder} />
            ),
            SingleValue,
            MenuList,
            Option,
          }}
        />
      </StyledSelect>
      <StyledErrorMessage>
        {meta.touched && meta.error ? <p data-testid={`${field?.name}-error`}>{meta.error}</p> : null}
      </StyledErrorMessage>
    </FormElement>
  );
}

FormikSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  outsideError: PropTypes.bool,
  overflow: PropTypes.bool,
  maxWidth: PropTypes.string,
  isPlaceholder: PropTypes.bool,
};

FormikSelect.defaultProps = {
  label: "",
  id: "",
  className: "",
  options: [],
  onChange: undefined,
  onBlur: undefined,
  outsideError: false,
  overflow: false,
  maxWidth: null,
  isPlaceholder: true,
};

export default FormikSelect;
