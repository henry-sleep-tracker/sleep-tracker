import { GET_CURRENT_PLAN } from "./constants";
import axios from "axios";

export function getUsersPlanExpDate(userId) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEFAULT_URL}/plans?userId=${userId}`
      );
      if (response.data.endTime) {
        return dispatch({
          type: GET_CURRENT_PLAN,
          payload: response.data.endTime,
        });
      } else {
        return dispatch({
          type: GET_CURRENT_PLAN,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
