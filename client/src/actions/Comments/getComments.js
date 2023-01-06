import { GET_COMMENTS } from "../constants";

const getComments = () => async (dispatch) => {
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

export default getComments;