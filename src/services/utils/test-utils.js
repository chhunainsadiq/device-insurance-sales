import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import realStore from "../Redux/store";
import theme from "../themes/light.json";


const mockStore = configureMockStore([thunk]);

export const renderComponent = (Component, state = {}) => {
  const mockedStore = mockStore({ ...realStore.getState(), ...state });

  return render(
    <Provider store={mockedStore}>
      <ThemeProvider theme={theme}>{Component} </ThemeProvider>
    </Provider>
  );
};

