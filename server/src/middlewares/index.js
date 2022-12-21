const { Router } = require("express");
const userMiddleware = require("./user.js");
const signupMiddleware = require("./signup.js");
const loginMiddleware = require("./login.js");
const restapiRouter = require("../routes/restapi");

const router = Router();

router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/restapi", restapiRouter);

module.exports = router;
