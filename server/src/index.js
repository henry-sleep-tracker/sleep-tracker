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

const getUser = require("./routes/getUser.js")
const getComments = require("./routes/Comments/getComments.js")
const postComment = require("./routes/Comments/postComment.js")
const deleteComment = require("./routes/Comments/deleteComment.js")
const updateProfile = require("./routes/updateProfile.js");
const changePassword = require("./routes/changePassword.js");
const deleteUser = require("./routes/deleteUser.js")
const getAverage = require("./routes/getAverage");
const webHook = require("./routes/webhook")

const router = Router();

router.use("/sleepfitbit", getSleepFitbit);
router.use("/user", userMiddleware);
router.use("/user", deleteUser);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/newrecord", newRecord);
router.use("/users", getUsers);
router.use("/users/update", updateUser);
router.use("/plans", plansRoutes);
router.use("/search", getSleepByDate);
router.use("/daterange", getSleepByRange);
router.use("/myuser", getUser);
router.use("/changeprofile", updateProfile);
router.use("/changepassword", changePassword);
router.use("/deleteuser", deleteUser)
router.use("/getcomments", getComments);
router.use("/postcomment", postComment);
router.use("/deletecomment", deleteComment);
router.use("/average", getAverage);
router.use("./webhook", webHook)

module.exports = router;
