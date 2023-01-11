const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const { getUsers } = require("../controllers/users/getUsers.js");
const { updateUser } = require("../controllers/users/updateUser.js");

//> ==================== End Points ======================== <//

router.get("/", getUsers );

router.put("/update/:id", updateUser );

module.exports = router;
