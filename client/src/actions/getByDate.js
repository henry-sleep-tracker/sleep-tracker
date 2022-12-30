import { GET_BY_DATE } from "./constants";

export const getByDate = (date) => async (dispatch) => {
  console.log("actionDate", date);
  try {
    const getDate = await fetch(`http://localhost:3001/search?date=${date}`);
    const response = await getDate.json();
    console.log("response", response);
    dispatch({ type: GET_BY_DATE, payload: response });
  } catch (error) {
    console.error(error);
  }
};