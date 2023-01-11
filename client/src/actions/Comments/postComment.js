import axios from "axios";

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