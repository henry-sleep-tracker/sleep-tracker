const { Router, application } = require("express");
const getSleepByRange = require("./routes/getSleepByRange");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");
const newRecord = require("./routes/newRecord_router.js");
const getUsers = require("./routes/getUsers.js");
const updateUser = require("./routes/updateUser.js");
const plansRoutes = require("./routes/pagosStripe");
const getSleepByDate = require("./routes/getSleepByDate");

const router = Router();

router.use("/sleepbyrange", getSleepByRange);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/newrecord", newRecord);
router.use("/users", getUsers);
router.use("/users/update", updateUser);
router.use("/plans", plansRoutes);
router.use("/search", getSleepByDate);

module.exports = router;
