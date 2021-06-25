import "./App.css";
import React, { Component } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "/home/user/Desktop/react/react1/src/components/redux/reducer.js";
import ToDoApp from "./components/TodoApp/ToDoApp";

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // chrome devtools thing
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ToDoApp />
      </Provider>
    );
  }
}

export default App;
