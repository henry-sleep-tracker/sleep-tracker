import axios from "axios";
import { DELETE_COMMENT } from "../constants";
import { message } from "react-message-popup";

export const deleteComment = (payload) => async (dispatch) => {
  try {
    await axios.delete("/deletecomment/" + payload);
    dispatch({
      type: DELETE_COMMENT,
      payload: payload,
    });
  } catch (error) {
    message.error("No existe comentario registrado", 2500);
    console.log(error, payload);
  }
};
