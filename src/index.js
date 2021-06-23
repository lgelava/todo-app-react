import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, createStorm } from "redux";

const initialState = { value: 0 };

const incrementAction = { type: "INCREMENT" };

const reducer = (state = 0, action) => {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  return state;
};

const store = createStore(reducer);
store.subscribe(() => console.log("lukaia"));

store.dispatch({ type: "INCREMENT" });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
