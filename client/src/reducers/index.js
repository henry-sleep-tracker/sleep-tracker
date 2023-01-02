import { createStore, applyMiddleware, combineReducers } from "redux";
import persistState from "redux-localstorage";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";
import recordReducer from "./recordReducer";
import dateReducer from "./dateReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: usersReducer,
  record: recordReducer,
  date: dateReducer,
  user: userReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware), persistState('user')),

);

export default store;
