const { Router } = require("express");
const { User } = require("../db.js");

const router = Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.destroy({
      where: {
        id: id
      }
    });
    console.log(result);
    res.status(200).json({ delete : result});
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
