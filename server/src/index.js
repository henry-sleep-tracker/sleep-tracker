const { Router, application } = require("express");
const getSleepData = require("./routes/getSleepData");
const userMiddleware = require("./middlewares/user");
const signupMiddleware = require("./middlewares/signup");
const loginMiddleware = require("./middlewares/login");
const newRecord = require("./routes/newRecord_router");

const router = Router();
router.use("/fitbitApi", getSleepData);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.post("/newRecord", newRecord);

module.exports = router;
