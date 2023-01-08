import { GET_CURRENT_COMMENT } from "../constants";
import axios from "axios";

export const getCurrentComment = (param) => async (dispatch) => {
  try {
    const payload = await axios.get("/getcurrentcomment/" + param);
    dispatch({
      type: GET_CURRENT_COMMENT,
      payload: payload,
    });

  } catch (error) {}
};
