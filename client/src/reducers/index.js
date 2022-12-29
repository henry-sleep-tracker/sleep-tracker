import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";
import recordReducer from "./recordReducer";
import dateReducer from "./dateReducer";

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: usersReducer,
  record: recordReducer,
  date: dateReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
