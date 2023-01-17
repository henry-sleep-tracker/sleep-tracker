const { Router, application } = require("express");
const getFitbitData = require("./routes/getFitbitData");
const getSleep = require("./routes/getSleep");
const getSteps = require("./routes/getSteps");
const user = require("./routes/user");
const signupMiddleware = require("./middlewares/signup.js");
const login = require("./routes/login.js");
const records = require("./routes/records.js");
const users = require("./routes/users.js");
const plansRoutes = require("./routes/pagosStripe");
const getComments = require("./routes/Comments/getComments.js");
const postComment = require("./routes/Comments/postComment.js");
const deleteComment = require("./routes/Comments/deleteComment.js");
const getCurrentComment = require("./routes/Comments/getCurrentComment");
const webHook = require("./routes/webhook");
const getRecordsRange = require("./routes/records_range.js");
const updateImage = require("./routes/updateImage.js");

const router = Router();

router.use("/fitbit", getFitbitData);
router.use("/sleep", getSleep);
router.use("/steps", getSteps);
router.use("/user", user);
router.use("/signup", signupMiddleware);
router.use("/login", login);
router.use("/records", records);
router.use("/users", users);
router.use("/plans", plansRoutes);
router.use("/getcomments", getComments);
router.use("/postcomment", postComment);
router.use("/deletecomment", deleteComment);
router.use("/getcurrentcomment", getCurrentComment);
router.use("/webhook", webHook);
router.use("/recordrange", getRecordsRange);
router.use("/changeimage", updateImage);

module.exports = router;
