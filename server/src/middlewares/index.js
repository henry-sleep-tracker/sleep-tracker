const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const signupMiddleware = require("../middlewares/signup");
const loginMiddleware = require("../middlewares/login");
const restapiRouter = require("../routes/restapi");

const router = Router();

router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);
router.use("/restapi", restapiRouter);

module.exports = router;
