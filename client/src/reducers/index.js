import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";
import recordReducer from "./recordReducer";
import dateSleepReducer from "./dateSleepReducer";
import rangeSleepReducer from "./rangeSleepReducer";

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: usersReducer,
  record: recordReducer,
  date: dateSleepReducer,
  range: rangeSleepReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
