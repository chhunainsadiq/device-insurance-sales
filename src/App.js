import React from "react";
import { Provider } from 'react-redux'
import store from './services/Redux/store'
import Router from "./scenes";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>  
  );
}

export default App;