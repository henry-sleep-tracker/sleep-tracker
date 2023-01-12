const { Router } = require("express");
const {
  getSleepStage,
  getSleepSession,
} = require("../controllers/getSleep_controller");
const router = Router();

router.get("/date", getSleepStage);
router.get("/range", getSleepSession);

module.exports = router;
