import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerLogin from "./loginReducer";
import usersReducer from "./usersReducer";
import recordReducer from "./recordReducer";
import stageSleepReducer from "./stageSleepReducer";
import sessionSleepReducer from "./sessionSleepReducer";
import stepsReducer from "./stepsReducer";
import getCommentsReducer from "./getCommentsReducer";
import getCurrentCommentReducer from "./getCurrentCommentReducer";
import loadingReducer from "./loadingReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["users"],
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["currentUser", "planExpirationDate"],
};

const reducers = combineReducers({
  logingReducer: ReducerLogin,
  users: persistReducer(userPersistConfig, usersReducer),
  record: recordReducer,
  stage: stageSleepReducer,
  steps: stepsReducer,
  session: sessionSleepReducer,
  comments: getCommentsReducer,
  currentComment: getCurrentCommentReducer,
  loading: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store);

export { persistor };

export default store;
