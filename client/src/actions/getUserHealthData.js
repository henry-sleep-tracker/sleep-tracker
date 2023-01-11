import { GET_SLEEP_STAGE, GET_SLEEP_SESSION, GET_STEPS } from "./constants";

export const getSleepStage = (date) => async (dispatch) => {
  try {
    const getDate = await fetch(
      `http://localhost:3001/sleep/date?date=${date}`
    );
    const response = await getDate.json();

    dispatch({ type: GET_SLEEP_STAGE, payload: response });
  } catch (error) {
    console.error(error);
  }
};

export const getSleepSession = (startDate, endDate) => async (dispatch) => {
  try {
    const getRange = await fetch(
      `http://localhost:3001/sleep/range?startDate=${startDate}&endDate=${endDate}`
    );
    const response = await getRange.json();

    dispatch({ type: GET_SLEEP_SESSION, payload: response });
  } catch (error) {
    console.error(error);
  }
};

export const getSteps = (startDate, endDate) => async (dispatch) => {
  try {
    const getSteps = await fetch(
      `localhost:3001/steps?startDate=${startDate}&endDate=${endDate}`
    );
    const response = await getSteps.json();
    dispatch({ type: GET_STEPS, payload: response });
  } catch (error) {}
};
