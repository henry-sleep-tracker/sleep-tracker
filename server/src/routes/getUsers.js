const { Router } = require('express');
const router = Router();
const { User, Plans } = require('../db.js');

router.get('/', async (req, res)=>{

  try {
    const users = await User.findAll({
      include: {
        model: Plans,
        attributes: ['name', 'endTime']
      },
      order: [['lastNames', 'ASC']]
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;