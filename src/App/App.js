import React from "react";
import "./App.css";

import PageRoutes from "../Router/Router";
import { Provider } from "react-redux";
import { store } from "../ReduxStore/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PageRoutes />
      </div>
    </Provider>
  );
}

export default App;
