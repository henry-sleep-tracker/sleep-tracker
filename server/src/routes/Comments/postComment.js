const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/getComments");
// const { getUserById } = require("../../controllers/user");
const { Comment, User } = require("../../db");

router.post("/", async (req, res) => {
  const { name, rate, comment , id} = req.body;
  // const idOfPostingUser = "47fc16a1-f220-4c0f-912f-9d716ca29ca4";
  try {
    // const currentUser = await getUserById(providedId)
    // console.log(currentUser.id)
    if (name && rate) {
      const allComments = await getComments();
      const commentExist = allComments.find(
        (element) => element.userId === id
      );
      if (!commentExist) {
        const commentCreated = await Comment.create({
          name,
          rate,
          comment,
        });
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
