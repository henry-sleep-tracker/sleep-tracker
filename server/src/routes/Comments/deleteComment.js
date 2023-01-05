const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/getComments");
const { Comment, User } = require("../../db");

router.delete("/", async (req, res) => {
  const idOfPostingUser = "9c75f9ed-8aa8-4a10-aee2-d6c9ff968bcf";
  try {
    const commentExist = await Comment.destroy({
      where: { userId: idOfPostingUser },
    });
    if (commentExist) {
      // const allComments = await getComments();
      // (element) => element.userId === idOfPostingUser
      console.log("Borrado del comentario exitoso!");
      return res.status(201).send('delete request');
    }
    return res.status(404).send(console.log("ERROR: eliminando comentario."));
  } catch (error) {
    res.status(404).send(console.log("Error de conexion"));
    console.log(error);
  }
});

module.exports = router;
