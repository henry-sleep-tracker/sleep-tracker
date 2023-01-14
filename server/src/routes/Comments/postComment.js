const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/comment/getComments");
const { Comment, User } = require("../../db");

router.post("/", async (req, res) => {
  const { name, rate, comment , id} = req.body;
  try {
    if (name && rate) {
      const allComments = await getComments();
      const commentExist = allComments.find(
        (element) => element.userId === id
      );
      console.log(!commentExist);
      if (!commentExist) {
        const commentCreated = await Comment.create({
          name,
          rate,
          comment,
        });
        console.log(commentCreated.dataValues);
        //relationship between comment and user:
        let userDb = await User.findOne({ where: { id: id } });
        console.log(userDb);
        await userDb.setComment(commentCreated);

        console.log("Creacion del comentario exitosa!");
        return res.status(201).send(commentCreated);
      }
      return res
        .status(404)
        .send(console.log("ERROR: Usted ya creo un comentario."));
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
