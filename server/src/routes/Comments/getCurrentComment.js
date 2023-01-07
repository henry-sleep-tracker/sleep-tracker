const { Router } = require("express");
const router = Router();
const { getCurrentComment } = require("../../controllers/getCurrentComment");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const currentComment = await getCurrentComment(id);
    if (currentComment) {
      return res.status(200).send(currentComment);
    }
    return res.status(400).send(console.log("No se cargo comentario " + id));
  } catch (error) {
    res.status(400).send(alert("ERROR: No han registrado comentario"));
  }
});

module.exports = router;
