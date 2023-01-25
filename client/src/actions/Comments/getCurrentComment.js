import { GET_CURRENT_COMMENT } from "../constants";
import axios from "axios";

export const getCurrentComment = (param) => async (dispatch) => {
  try {
    const payload = await axios.get(`${process.env.REACT_APP_DEFAULT_URL}/getcurrentcomment/${param}`);
    dispatch({
      type: GET_CURRENT_COMMENT,
      payload: payload,
    });

  } catch (error) {}
};
