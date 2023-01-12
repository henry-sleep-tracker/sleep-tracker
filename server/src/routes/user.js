const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const {
  postUser,
  postGoogleUser,
  forgotPassword,
  resetPassword,
  getUserByEmail,
  deleteUser,
} = require("../controllers/user");

//> ==================== End Points ======================== <//

router.post("/", postUser);
router.post("/google", postGoogleUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/:email", getUserByEmail);
router.delete("/:id/:password", deleteUser);

module.exports = router;
