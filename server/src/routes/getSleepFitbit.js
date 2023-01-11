const { Router } = require("express");
const router = Router();
const { getFitbitData } = require("../controllers/getFitbitData_controller");

router.post("/", getFitbitData);

module.exports = router;
