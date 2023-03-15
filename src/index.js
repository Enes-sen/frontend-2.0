import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/root/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import { Provider } from "react-redux";
import store from "../src/redux/reducers/config";
import { BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/posts">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
