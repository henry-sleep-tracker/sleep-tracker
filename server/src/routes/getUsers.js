const { Router } = require('express');
const router = Router();
const { User } = require('../db.js');

router.get('/', async (req, res)=>{

  try {
    const users = await User.findAll({
      order: [['lastNames', 'ASC']]
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;