const { Router } = require("express");
const router = Router();
const { getComments } = require("../../controllers/Comment/getComments");

router.get("/", async (req, res) => {
  try {
    const allComments = await getComments();
    if (allComments.length) {
      return res.status(200).send(allComments);
    }
    return res.status(400).send(console.log("No se cargaron comentarios"));
  } catch (error) {
    res.status(400).send(alert("ERROR: No han registrado ningun comentario"));
  }
});

module.exports = router;
