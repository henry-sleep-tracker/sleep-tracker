import axios from "axios";
import { message } from "react-message-popup";

export const postComment = (payload) => {
  return async () => {
    try {
      const json = await axios.post(`${process.env.REACT_APP_DEFAULT_URL}/postcomment`, payload);
      message.error("Comentario registrado exitosamente", 2500);
      return json;
    } catch (error) {
      message.error("Error al registrar comentario", 2500);
      console.log(error);
    }
  };
};

export default postComment;
