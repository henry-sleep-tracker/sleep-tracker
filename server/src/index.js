const { Router } = require("express");
const restapiRouter = require("./routes/restapi");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");

const router = Router();

router.use("/restapi", restapiRouter);
router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);

module.exports = router;
