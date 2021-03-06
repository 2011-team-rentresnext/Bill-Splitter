
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import users from "./users";
import dummyReceipt from "./dummyReceipt";
import receipt from "./receipt";
import debts from "./debts"
import receipts from './receipts'

const reducer = combineReducers({ user, users, receipt, receipts, debts });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)
//fixing git
export default store
export * from './user'
