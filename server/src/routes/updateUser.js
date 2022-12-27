const { Router } = require('express');
const { User } = require('../db.js');

const router = Router();

router.put('/:userId', async (req, res)=>{
  
  const { userId } = req.params;
  const updatedFields = req.body;

  console.log(userId, updatedFields);

  try {
    const result = await User.update( updatedFields, {
      where: {
        id: userId
      }
    });
    res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;