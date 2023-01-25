const { Router } = require("express");
const router = Router();
const { User } = require("../db.js");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  try {
    const update = await User.update(info, {
      where: {
        id: id,
      },
    });
    if (update) {
      const user = await User.findOne({ where: { id: id } });
      return res.status(200).jsonp(user);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
