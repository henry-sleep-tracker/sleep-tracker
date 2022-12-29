import axios from "axios";

export const GET_COFFEE_SIZES = "GET_COFFEE_SIZES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_DRINKS = "GET_DRINKS";

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
