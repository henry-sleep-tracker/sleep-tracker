
export const SET_STATUS_NEW_USER = "SET_STATUS_NEW_USER";
export const SET_STATUS_NEW_USER_ERROR = "SET_STATUS_NEW_USER_ERROR";
export const SET_STATUS_EXISTING_USER = "SET_STATUS_EXISTING_USER";
export const SET_STATUS_PASSWORD_UPDATE_SUCCES = "SET_STATUS_PASSWORD_UPDATE_SUCCES";
export const SET_STATUS_PASSWORD_UPDATE_ERROR = "SET_STATUS_PASSWORD_UPDATE_ERROR";
export const SET_DAY = "SET_DAY";
export const SET_TIME = "SET_TIME";
export const SET_START_TIME = "SET_START_TIME";
export const SET_END_TIME = "SET_END_TIME";
export const SET_SYNC_FIT_BIT = "SET_SYNC_FIT_BIT";

/* ====================== SET STATUS FOR USER ACTIONS ======================= */

export const setDay = day => {
  return {
    type: SET_DAY,
    payload: day,
  };
};

export const setTime = time => {
  return {
    type: SET_TIME,
    payload: time,
  };
};

export const setStartTime = time => {
  return {
    type: SET_START_TIME,
    payload: time,
  };
};

export const setEndTime = time => {
  return {
    type: SET_END_TIME,
    payload: time,
  };
};

export const setSyncFitbit = value => {
  return {
    type: SET_SYNC_FIT_BIT,
    payload: value,
  };
};

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

