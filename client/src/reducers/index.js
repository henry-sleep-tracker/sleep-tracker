import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";
import recordReducer from "./recordReducer";
import dateSleepReducer from "./dateSleepReducer";
import rangeSleepReducer from "./rangeSleepReducer";
import getCommentsReducer from "./getCommentReducer";

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['users']
}

const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['currentUser']
}
 

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: persistReducer (userPersistConfig, usersReducer),
  record: recordReducer,
  date: dateSleepReducer,
  range: rangeSleepReducer,
  comments: getCommentsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const persistor = persistStore(store);

export { persistor}

export default store;
