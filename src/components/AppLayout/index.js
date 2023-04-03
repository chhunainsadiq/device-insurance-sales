import PropTypes from "prop-types";
import React from "react";
import { withTheme } from "styled-components";

import { GlobalStyle, LayoutWrapper } from "./index.styled";

function AppLayout({ children, theme }) {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper data-testid="app-layout">
        {children}
      </LayoutWrapper>
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(AppLayout);
