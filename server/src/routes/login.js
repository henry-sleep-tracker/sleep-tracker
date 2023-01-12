const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const { login, manualLogin } = require("../controllers/login");

//> ==================== End Points ======================== <//

router.post("/", login);
router.post("/manual", manualLogin);
module.exports = router;
