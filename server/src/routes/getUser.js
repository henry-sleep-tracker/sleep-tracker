const { Router } = require('express');
const router = Router();
const { User } = require('../db.js');

router.get('/:id', async (req, res)=>{
    const { id }  = req.params;
    console.log("ID RUTA", id)
  try { 
    const user = await User.findByPk(id);
    await user.update({ lastLogin: new Date()}); // Actualiza 'lastLogin' en la DB
    console.log(user);
    console.log("ROUTE USER", user)
    res.status(200).jsonp(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;