import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18n";
import { BrowserRouter as Router } from "react-router-dom";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// Registration happens in UpdatePwaComponent.jsx
// serviceWorkerRegistration.register();
