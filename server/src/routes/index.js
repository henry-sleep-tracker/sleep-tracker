const { Router } = require("express");

const restapiRouter = require("./restapi");

const router = Router();
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");

router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);

router.use("/restapi", restapiRouter);

module.exports = router;
