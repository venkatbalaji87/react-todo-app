import "./styles.css";

import React from "react";
import ReactDom from "react-dom";
import App from "./App";

//index.html id from app
const $appRoot = document.querySelector("#app");

ReactDom.render(<App />, $appRoot);
