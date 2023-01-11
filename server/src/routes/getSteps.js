const { Router } = require("express");
const router = Router();
const { getSteps } = require("../controllers/getSteps_controller");

router.get("/", getSteps);

module.exports = router;
