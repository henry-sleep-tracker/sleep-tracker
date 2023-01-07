const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/getComments");
// const { getUserById } = require("../../controllers/user");
const { Comment, User } = require("../../db");

router.post("/", async (req, res) => {
  const { name, rate, comment } = req.body;
  let userDb;
  const idOfPostingUser = '9c75f9ed-8aa8-4a10-aee2-d6c9ff968bcf'
  try {

    // const currentUser = await getUserById(providedId)
    // console.log(currentUser.id)
    if (name && rate) {
      const allComments = await getComments();
      const commentExist = allComments.find((element) => element.userId === idOfPostingUser);
      if (!commentExist) {
        const commentCreated = await Comment.create({
          name,
          rate,
          comment,
        });
        
        //relationship between comment and user:
        userDb = await User.findOne ({ where: { id: idOfPostingUser }});
        await userDb.setComment(commentCreated)

        console.log('Creacion del comentario exitosa!')
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
