const { Router } = require("express");
const router = Router();
const { findUserById, updatePassword } = require("../functions/user");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    console.log("CHANGE PASSWORD ID", id);
    console.log("NEW PASSWORD", newPassword);
    if (!id || !newPassword) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const oldUser = await findUserById(id);
    if (!oldUser) {
      return res.status(202).send("el usuario no existe");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updatePassword(id, hashedPassword);
    return res.status(200).send("Verificado");
  } catch (error) {
    res.status(400).send("Sin verificar");
  }
});

module.exports = router;
