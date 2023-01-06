const { Router } = require('express');
const router = Router();
const { getUserById, updatePassword } = require("../controllers/user");
const JWT_SECRET = "CVDF61651BV231TR894VBCX51LIK5LÑK84";
const jwt = require("jsonwebtoken");

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        if (!id || !newPassword) {
          return res.status(428).send("Falta enviar datos obligatorios");
        }
        const oldUser = await getUserById(id);
        if (!oldUser) {
          return res.status(202).send("el usuario no existe");
        }
        const secret = JWT_SECRET + oldUser.hashedPassword;
        const verify = jwt.verify(token, secret);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updatePassword(id, hashedPassword);
        res.status(200).send("Verificado");
      } catch (error) {
        res.status(400).send("Sin verificar");
      }
    });

module.exports = router;