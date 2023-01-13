const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const { getUsers } = require("../controllers/users/getUsers.js");
const { updateUser } = require("../controllers/users/updateUser.js");
const { numberUsersPerPlan } = require("../controllers/users/numberUsersPerPlan.js");
const { newUsersLastWeek } = require("../controllers/users/newUsersLastWeek.js");
const {getFilters} = require ('../controllers/users/filtrosCombinados.js')


//> ==================== End Points ======================== <//

router.get("/", getUsers );
router.get("/numberUsersPerPlan", numberUsersPerPlan );
router.get("/newUsersLastWeek", newUsersLastWeek );
router.put("/update/:id", updateUser ); //es la misma ruta que para actualizar un usuario. Eliminar esta ruta y utilizar la otra.
router.get("/filter", getFilters);

module.exports = router;
