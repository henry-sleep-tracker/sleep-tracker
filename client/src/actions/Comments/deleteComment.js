import axios from "axios";
import { DELETE_COMMENT } from "../constants";

export const deleteComment = (payload) => async (dispatch) => {
  try {
    await axios.delete("/deletecomment/" + payload);
    dispatch({
      type: DELETE_COMMENT,
      payload: payload,
    })

  } catch (error) {
    alert("No existe comentario registrado");
    console.log(error, payload);
  }
};
