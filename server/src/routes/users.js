const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const { getUsers } = require ('../controllers/users/getUsers.js')
const { getNationalities } = require ('../controllers/users/getNationalities.js')
const { updateUser } = require("../controllers/users/updateUser.js");
const { numberUsersPerPlan } = require("../controllers/users/numberUsersPerPlan.js");
const { newUsersLastWeek } = require("../controllers/users/newUsersLastWeek.js");


//> ==================== End Points ======================== <//

router.get("/", getUsers );
router.get("/nationalities", getNationalities );
router.get("/numberUsersPerPlan", numberUsersPerPlan );
router.get("/newUsersLastWeek", newUsersLastWeek );
router.put("/update/:id", updateUser ); //es la misma ruta que para actualizar un usuario. Eliminar esta ruta y utilizar la otra.

module.exports = router;
