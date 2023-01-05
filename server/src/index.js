const { Router, application } = require("express");
const getSleepFitbit = require("./routes/getSleepFitbit");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");
const newRecord = require("./routes/newRecord_router.js");
const getUsers = require("./routes/getUsers.js");
const updateUser = require("./routes/updateUser.js");
const plansRoutes = require("./routes/pagosStripe");
const getSleepByDate = require("./routes/getSleepByDate");
const getSleepByRange = require("./routes/getSleepByRange");
const getUser = require("./routes/getUser.js");

const router = Router();

router.use("/sleepfitbit", getSleepFitbit);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/newrecord", newRecord);
router.use("/users", getUsers);
router.use("/users/update", updateUser);
router.use("/plans", plansRoutes);
router.use("/search", getSleepByDate);
router.use("/daterange", getSleepByRange);
router.use("/myuser", getUser);

module.exports = router;
