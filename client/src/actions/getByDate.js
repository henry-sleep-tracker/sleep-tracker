import { GET_BY_DATE } from "./constants";

export const getByDate = (date) => async (dispatch) => {
  try {
    const getDate = await fetch(`http://localhost:3001/search?date=${date}`);
    const response = await getDate.json();

    dispatch({ type: GET_BY_DATE, payload: response });
  } catch (error) {
    console.error(error);
  }
};
