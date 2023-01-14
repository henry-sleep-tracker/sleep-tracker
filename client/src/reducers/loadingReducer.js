import {
  SET_STATUS_NEW_USER,
  SET_STATUS_NEW_USER_ERROR,
  SET_STATUS_EXISTING_USER,
  SET_STATUS_PASSWORD_UPDATE_SUCCES,
  SET_STATUS_PASSWORD_UPDATE_ERROR,
} from "../actions/loading";

const initialState = {
  newUser: false,
  newUserError: false,
  existingUser: false,
  passUpdateOk: false,
  passUpdateError: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS_NEW_USER:
      return { ...state, newUser: action.payload };
    case SET_STATUS_NEW_USER_ERROR:
      return { ...state, newUserError: action.payload };
    case SET_STATUS_EXISTING_USER:
      return { ...state, existingUser: action.payload };
    case SET_STATUS_PASSWORD_UPDATE_SUCCES:
      return { ...state, passUpdateOk: action.payload };
    case SET_STATUS_PASSWORD_UPDATE_ERROR:
      return { ...state, passUpdateError: action.payload };
    default:
      return { ...state };
  }
};

export default loadingReducer;
