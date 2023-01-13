const { Router } = require('express');
const router = Router();
const { User } = require('../db.js');

router.put('/:id', async (req, res)=>{
    const { id }  = req.params;
    const info  = req.body
    console.log("ID RUTA", id)
    console.log("INFO PROFILE", info)
  try { 
    const update = await User.update(info, {
      where: {
        id: id
      }
    });
    console.log("ROUTE UPDATE", update);
    if(update){
      const user = await User.findOne({ where: { id: id } });
      console.log("ROUTE UPDATE USER", user);
      return res.status(200).jsonp(user);
    }
    
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;