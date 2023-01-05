const { Router } = require("express");
const router = Router();
const { getComments } = require("../controllers/getComments");
const { Comment, User } = require("../db");

router.post("/", async (req, res) => {
  const { name, rate, comment, id } = req.body;

  try {
    if (name && rate) {
      const allComments = await getComments();
      const commentDb = Comment;

      const userId = (await commentDb.getUser()).id

      const commentExist = allComments.find((element) => element.id === id);
      if (!commentExist) {
        const commentCreated = await Comment.create({
          name,
          rate,
          comment,
        });

        console.log(userId);
        return res.status(201).send(commentCreated);
      }
      return res
        .status(404)
        .send(console.log("ERROR: No es posible crear el comentario."));
    }
  } catch (error) {
    !name || !rate
      ? res.status(404).send(console.log("Nombre y/o puntuacion no fue ingresado"))
      : res.status(404).send(console.log("Error de conexion"));
    console.log(error);
  }
});

module.exports = router;
