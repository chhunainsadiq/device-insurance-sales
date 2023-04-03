import React from "react";
import { components } from "react-select";

export function Control(controlProps) {
  return <components.Control className="formik-select" {...controlProps} />;
}

export function Placeholder({ isPlaceholder, ...controlProps }) {
  return (
    <components.Placeholder
      className="formik-select-placeholder"
      {...controlProps}
    >
      {isPlaceholder ? "Select" : ""}
    </components.Placeholder>
  );
}

export function SingleValue(controlProps) {
  return (
    <components.SingleValue
      className="formik-select-single-value"
      {...controlProps}
    />
  );
}
export function MenuList(controlProps) {
  return (
    <components.MenuList className="formik-select-menulist" {...controlProps}>
      {controlProps.children}
    </components.MenuList>
  );
}

export function Option(controlProps) {
  return (
    <components.Option
      className={`formik-select-option ${
        controlProps.isFocused ? "focused" : ""
      } ${controlProps.isSelected ? "selected" : ""}`}
      {...controlProps}
    />
  );
}
