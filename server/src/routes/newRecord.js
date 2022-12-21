const { Router } = require("express");
const router = Router();

const newRecord = require("./newRecord_router"); // ==> Oscar Sarabia
router.post("/newRecord", newRecord); // ==> Oscar Sarabia
