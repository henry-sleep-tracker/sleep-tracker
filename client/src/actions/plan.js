import { GET_CURRENT_PLAN } from "./constants";
import axios from "axios";

export function getUsersPlanExpDate(userId) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/plans?userId=${userId}`
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
