import PropTypes from "prop-types";
import React from "react";

import { StyledButton } from "./index.styled";

function Button({
  children,
  link,
  to,
  icon,
  styletype,
  size,
  role,
  width,
  ...props
}) {
  return (
    <StyledButton
      role={role}
      styletype={styletype}
      size={size}
      width={width}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  styletype: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  role: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  styletype: "primary",
  size: "normal",
  width: "normal",
  role: "button",
};

export default Button;
