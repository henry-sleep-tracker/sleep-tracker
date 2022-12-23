const { Router } = require("express");
const getSleepByRange = require("./routes/getSleepByRange");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");
const newRecord = require("./routes/newRecord_router.js");

const router = Router();

router.use("/sleepbyrange", getSleepByRange);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/newrecord", newRecord);

module.exports = router;
