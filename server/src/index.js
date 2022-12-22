const { Router } = require("express");
const getSleepData = require("./routes/getSleepData");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");
const newRecord = require("./routes/newRecord_router.js");

const router = Router();

router.use("/fitbitApi", getSleepData);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.post("/newRecord", newRecord);

module.exports = router;
