import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import root from "./reducer";
import { NODE_ENV } from "../config";
import isBrowser from "utils/isBrowser";

const middleware = [thunk];

if (NODE_ENV === "development") {
  middleware.push(logger);
}

const composeEnhancer =
  (isBrowser() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(
  root,
  composeEnhancer(applyMiddleware(...middleware))
);
