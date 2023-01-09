const { Router } = require("express");
const router = Router();
const { User, Plans } = require("../db.js");

router.get("/", async (req, res) => {
  let { page, limit } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const users = await User.findAll({
      order: [["lastNames", "ASC"]],
      paranoid: false,
    });
    res.status(200).send({
      users: users.slice((page - 1) * limit, page * limit),
      total: users.length,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
