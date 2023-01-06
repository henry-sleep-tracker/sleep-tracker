// import { POST_COMMENTS } from "../constants";
import axios from "axios";

// const postComment = () => async (dispatch) => {
//   try {
//     fetch("/postcomment")
//       .then((response) => response.json())
//       .then((payload) =>
//         dispatch({
//           type: GET_COMMENTS,
//           payload: payload,
//         })
//       )
//       .catch((error) => console.log(error));
//   } catch (error) {
//     console.error(error);
//   }
// };

export const postComment = (payload) => {
  return async () => {
    try {
      const json = await axios.post("/postcomment", payload);
      alert("Comentario registrado exitosamente");
      return json;
    } catch (error) {
      alert("Error al registrar comentario");
      console.log(error);
    }
  };
};


export default postComment;