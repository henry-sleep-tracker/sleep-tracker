import { GET_SLEEP_BY_DATE, GET_SLEEP_BY_RANGE } from "./constants";

export const getSleepByDate = (date) => async (dispatch) => {
  try {
    const getDate = await fetch(`http://localhost:3001/search?date=${date}`);
    const response = await getDate.json();

    dispatch({ type: GET_SLEEP_BY_DATE, payload: response });
  } catch (error) {
    console.error(error);
  }
};

export const getSleepByRange = (startDate, endDate) => async (dispatch) => {
  try {
    const getRange = await fetch(
      `http://localhost:3001/daterange?startDate=${startDate}&endDate=${endDate}`
    );
    const response = await getRange.json();

    dispatch({ type: GET_SLEEP_BY_RANGE, payload: response });
  } catch (error) {
    console.error(error);
  }
};
