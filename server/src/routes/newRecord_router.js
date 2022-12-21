const { Router } = require("express");
const router = Router();

const { post_new_record } = require("../controllers/newRecord_controller");
const { new_record_validator } = require("../middlewares/newRecord_validator");

router.post("/", new_record_validator, post_new_record);

module.exports = router;
