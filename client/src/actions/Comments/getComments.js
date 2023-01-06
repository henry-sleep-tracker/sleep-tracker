import { GET_COMMENTS } from "../constants";

export const getComments = () => async (dispatch) => {
  try {
    fetch("http://localhost:3001/getcomments")
      .then((response) => response.json())
      .then((payload) =>
        dispatch({
          type: GET_COMMENTS,
          payload: payload,
        })
      )
      .catch((error) => console.log(error));
  } catch (error) {
    console.error(error);
  }
};

// export const getSleepByDate = (date) => async (dispatch) => {
//   try {
//     const getDate = await fetch(`http://localhost:3001/search?date=${date}`);
//     const response = await getDate.json();

//     dispatch({ type: GET_SLEEP_BY_DATE, payload: response });
//   } catch (error) {
//     console.error(error);
//   }
// };
