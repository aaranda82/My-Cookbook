import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createGlobalStyle } from "styled-components";
import { ColorScheme } from "./ColorScheme";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";
const { Provider } = require("react-redux");

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${ColorScheme.ivory};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
