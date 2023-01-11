const { Router } = require("express");
const {
  getSleepByDate,
  getSleepByRange,
} = require("../controllers/getSleep_controller");
const router = Router();

router.get("/date", getSleepByDate);
router.get("/range", getSleepByRange);

module.exports = router;
