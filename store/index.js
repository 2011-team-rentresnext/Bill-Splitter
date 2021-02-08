import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import users from "./users";
import dummyReceipt from "./dummyReceipt";
import receipt from "./receipt";

const reducer = combineReducers({ user, users, dummyReceipt, receipt });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);
//fixing git
export default store;
export * from "./user";
