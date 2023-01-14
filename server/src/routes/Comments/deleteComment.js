const { Router } = require("express");
const router = Router();
// const { getComments } = require("../../controllers/getComments");
const { Comment, User } = require("../../db");

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commentExist = await Comment.destroy({
      where: { userId: id },
    });
    if (commentExist) {
      console.log("Borrado del comentario exitoso!");
      return res.status(201).send("Comentario eliminado");
    }
    return res.status(404).send(console.log("ERROR: eliminando comentario."));
  } catch (error) {
    res.status(404).send(console.log("Error de conexion"));
    console.log(error);
  }
});

module.exports = router;
