import axios from "axios";

export const deleteComment = async (payload) => {
  try {
    await axios.delete("/deletecomment/" + payload);
  } catch (error) {
    alert("No existe comentario registrado");
    console.log(error, payload);
  }
};
