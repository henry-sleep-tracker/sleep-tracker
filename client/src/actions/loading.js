
export const SET_STATUS_NEW_USER = "SET_STATUS_NEW_USER";
export const SET_STATUS_NEW_USER_ERROR = "SET_STATUS_NEW_USER_ERROR";
export const SET_STATUS_EXISTING_USER = "SET_STATUS_EXISTING_USER";
export const SET_STATUS_PASSWORD_UPDATE_SUCCES = "SET_STATUS_PASSWORD_UPDATE_SUCCES";
export const SET_STATUS_PASSWORD_UPDATE_ERROR = "SET_STATUS_PASSWORD_UPDATE_ERROR";

/* ====================== SET STATUS FOR USER ACTIONS ======================= */

export const setStatusNewUser = () => {
  return {
    type: SET_STATUS_NEW_USER,
    payload: false,
  };
};

export const setStatusNewUserError = () => {
  return {
    type: SET_STATUS_NEW_USER_ERROR,
    payload: false,
  };
};

export const setStatusExistingUser = () => {
  return {
    type: SET_STATUS_EXISTING_USER,
    payload: false,
  };
};

export const setStatusUpdatePassOk = () => {
  return {
    type: SET_STATUS_PASSWORD_UPDATE_SUCCES,
    payload: false,
  };
};

export const setStatusUpdatePassError = () => {
  return {
    type: SET_STATUS_PASSWORD_UPDATE_ERROR,
    payload: false,
  };
};

