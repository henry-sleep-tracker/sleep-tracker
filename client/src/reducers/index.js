import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: usersReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
