import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import root from "./reducer";
import { NODE_ENV } from "../config";

const middleware = [thunk];

// In case of development mode add redux-logger middleware
if (NODE_ENV === "development") {
  middleware.push(logger);
}

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer = compose;

export default createStore(
  root,
  composeEnhancer(applyMiddleware(...middleware))
);
