const { Router } = require("express");

const restapiRouter = require("./restapi");

const router = Router();

router.use("/restapi", restapiRouter);
