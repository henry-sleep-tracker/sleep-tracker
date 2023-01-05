const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/getComments");
const { getUserById } = require("../../controllers/user");
const { Comment, User } = require("../../db");

router.post("/", async (req, res) => {
  const { name, rate, comment } = req.body;
  let userDb, commentDb;

  try {

    const currentUser = await getUserById('a8f34d51-df74-4051-aa59-63aeb928c5a9')
    console.log(currentUser)
    if (!name) {
      const allComments = await getComments();
      const commentExist = allComments.find((element) => element.name === name);
      if (!commentExist) {
        const commentCreated = await Comment.create({
          name,
          rate,
          comment,
        });

        return res.status(201).send(commentCreated);
      }
      return res
        .status(404)
        .send(console.log("ERROR: No es posible crear el comentario."));
    }
  } catch (error) {
    !name || !rate
      ? res
          .status(404)
          .send(console.log("Nombre y/o puntuacion no fue ingresado"))
      : res.status(404).send(console.log("Error de conexion"));
    console.log(error);
  }
});

module.exports = router;
