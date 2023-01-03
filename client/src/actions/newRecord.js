import axios from "axios";

export const GET_COFFEE_SIZES = "GET_COFFEE_SIZES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_DRINKS = "GET_DRINKS";
export const NEW_RECORD = "NEW_RECORD";
export const ERROR_TRYING_TO_CREATE_RECORD = "ERROR_TRYING_TO_CREATE_RECORD";
export const NEW_ACTIVITY = "NEW_ACTIVITY";
export const ERROR_TRYING_TO_CREATE_ACTIVITY =
  "ERROR_TRYING_TO_CREATE_ACTIVITY";
export const GET_LAST_ID_ACTIVITY = "GET_LAST_ID_ACTIVITY";
export const NEW_COFFEE_SIZE = "NEW_COFFEE_SIZE";
export const ERROR_TRYING_TO_CREATE_COFFEE_SIZE =
  "ERROR_TRYING_TO_CREATE_COFFEE_SIZE";
export const GET_LAST_ID_COFFEE_SIZE = "GET_LAST_ID_COFFEE_SIZE";
export const NEW_DRINK = "NEW_DRINK";
export const ERROR_TRYING_TO_CREATE_DRINK = "ERROR_TRYING_TO_CREATE_DRINK";
export const GET_LAST_ID_DRINK = "GET_LAST_ID_DRINK";

/* ====================== GET'S SECTION ======================= */

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const resActivities = await axios.get(
        "http://localhost:3001/newrecord/activity"
      );
      dispatch({
        type: GET_ACTIVITIES,
        payload: resActivities.data,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

export const getLastIdActivity = () => {
  return async function (dispatch) {
    try {
      const resActivities = await axios.get(
        "http://localhost:3001/newrecord/activity"
      );
      dispatch({
        type: GET_LAST_ID_ACTIVITY,
        payload: resActivities.data.length + 1,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

export const getCoffeeSizes = () => {
  return async function (dispatch) {
    try {
      const resCoffeeSizes = await axios.get(
        "http://localhost:3001/newrecord/coffeesize"
      );
      dispatch({
        type: GET_COFFEE_SIZES,
        payload: resCoffeeSizes.data,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

export const getLastIdCoffeSize = () => {
  return async function (dispatch) {
    try {
      const resCoffeeSizes = await axios.get(
        "http://localhost:3001/newrecord/coffeesize"
      );
      dispatch({
        type: GET_LAST_ID_COFFEE_SIZE,
        payload: resCoffeeSizes.data.length + 1,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

export const getDrinks = () => {
  return async function (dispatch) {
    try {
      const resDrinks = await axios.get(
        "http://localhost:3001/newrecord/drink"
      );
      dispatch({
        type: GET_DRINKS,
        payload: resDrinks.data,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

export const getLastIdDrink = () => {
  return async function (dispatch) {
    try {
      const resDrinks = await axios.get(
        "http://localhost:3001/newrecord/drink"
      );
      dispatch({
        type: GET_LAST_ID_DRINK,
        payload: resDrinks.data.length + 1,
      });
    } catch (err) {
      alert(`${err.response.data} try again`);
    }
  };
};

/* ====================== POST SECTION ======================= */

export const createNewRecord = obj => {
  return async function (dispatch) {
    try {
      let newRecord = null;
      newRecord = await axios.post("http://localhost:3001/newrecord", obj);
      dispatch({
        type: NEW_RECORD,
        payload: newRecord.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TRYING_TO_CREATE_RECORD,
        payload: err.message,
      });
    }
  };
};

export const createNewActivity = obj => {
  return async function (dispatch) {
    try {
      let newActivity = null;
      newActivity = await axios.post(
        "http://localhost:3001/newrecord/activity",
        obj
      );
      dispatch({
        type: NEW_ACTIVITY,
        payload: newActivity.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TRYING_TO_CREATE_ACTIVITY,
        payload: err.response.data.error,
      });
    }
  };
};

export const createNewCoffeeSize = obj => {
  return async function (dispatch) {
    try {
      let newCoffeeSize = null;
      newCoffeeSize = await axios.post(
        "http://localhost:3001/newrecord/coffeesize",
        obj
      );
      dispatch({
        type: NEW_COFFEE_SIZE,
        payload: newCoffeeSize.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TRYING_TO_CREATE_COFFEE_SIZE,
        payload: err.response.data.error,
      });
    }
  };
};

export const createNewDrink = obj => {
  return async function (dispatch) {
    try {
      let newDrink = null;
      newDrink = await axios.post("http://localhost:3001/newrecord/drink", obj);
      dispatch({
        type: NEW_DRINK,
        payload: newDrink.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TRYING_TO_CREATE_DRINK,
        payload: err.response.data.error,
      });
    }
  };
};
