const { Router } = require("express");
const userMiddleware = require("./middlewares/user.js");
const signupMiddleware = require("./middlewares/signup.js");
const loginMiddleware = require("./middlewares/login.js");

const router = Router();

let DB = [];
//DB es una db falsa, vamos a tener que reemplazarla con una nueva

router.use("/user", userMiddleware);
router.use("/signup", signupMiddleware);
router.use("/login", loginMiddleware);

module.exports = router;
