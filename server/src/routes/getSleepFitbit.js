const { Router } = require("express");
const router = Router();
const { getSleepFitbit } = require("../controllers/getFitbitData_controller");
const { getStepsFitbit } = require("../controllers/getFitbitData_controller");

router.post("/sleep", getSleepFitbit);
router.post("/steps", getStepsFitbit);

module.exports = router;
