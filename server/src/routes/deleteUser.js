const { Router } = require('express');
const router = Router();
const { User } = require('../db.js');
const bcrypt = require("bcrypt");
const { getUserById } = require("../controllers/user");

router.delete('/:id', async (req, res)=>{
    try {
        const { id, password} = req.params;
        function copareHash(password, hashed) {
            return bcrypt.compareSync(password, hashed);
          }

        if (!id || !password) {
            return res.status(428).send("Falta enviar datos obligatorios");
          }

        const user = await getUserById(id)
        if(!user){
            return res.status(202).send("el usuario no existe");
        }

        if(copareHash(password, user.hashedPassword)){
            const result = await User.destroy({
                where: {
                  id: id
                },
              });
            console.log("RESULT DELETE", result); // 0 es que no borro y 1 es que si borro 
            return res.status(200).send("Usuario eliminado");
        }
      } catch (error) {
        return res.status(400).send("No se pudo eliminar el usuario");
      }
    });

module.exports = router;