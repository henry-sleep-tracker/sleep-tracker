import { GET_COMMENTS } from "../constants";
import axios from "axios";

const getComments = () => async (dispatch) => {
  try {
    const payload = await axios.get("/getcomments")
        dispatch({
          type: GET_COMMENTS,
          payload: payload,
        })
  } catch (error) {
    console.error(error);
  }
};

export default getComments;