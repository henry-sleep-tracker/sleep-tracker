const { Router, application } = require("express");
const deleteComment = require("./routes/Comments/deleteComment.js");
const login = require("./routes/login.js");
const getComments = require("./routes/Comments/getComments.js");
const getCurrentComment = require("./routes/Comments/getCurrentComment");
const getFitbitData = require("./routes/getFitbitData");
const getRecordsRange = require("./routes/records_range.js");
const getSleep = require("./routes/getSleep");
const getSteps = require("./routes/getSteps");
const plansRoutes = require("./routes/pagosStripe");
const postComment = require("./routes/Comments/postComment.js");
const records = require("./routes/records.js");
const signupMiddleware = require("./middlewares/signup.js");
const updateImage = require("./routes/updateImage.js");
const user = require("./routes/user");
const users = require("./routes/users.js");

const webHook = require("./routes/webhook");

const router = Router();

router.use("/changeimage", updateImage);
router.use("/deletecomment", deleteComment);
router.use("/fitbit", getFitbitData);
router.use("/getcurrentcomment", getCurrentComment);
router.use("/getcomments", getComments);
router.use("/login", login);
router.use("/plans", plansRoutes);
router.use("/postcomment", postComment);
router.use("/records", records);
router.use("/recordrange", getRecordsRange);
router.use("/signup", signupMiddleware);
router.use("/sleep", getSleep);
router.use("/steps", getSteps);
router.use("/user", user);
router.use("/users", users);
router.use("/webhook", webHook);

module.exports = router;
