const { Router } = require('express');
const router = Router();
const { User } = require('../db.js');

router.get('/:id', async (req, res)=>{
    const { id }  = req.params;
    console.log("ID RUTA", id)
  try { 
    const user = await User.findByPk(id);
    console.log("ROUTE USER", user)
    res.status(200).jsonp(user);//aqui veo que dice 'jsonp' creo que la 'p' esta demas(sea quien sea que escribio esta linea)
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;