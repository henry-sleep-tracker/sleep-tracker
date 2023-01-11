const { Router } = require("express");
const router = Router();


const getRecordsRange = require('../controllers/recordsRange.js')


router.get("/", getRecordsRange);

module.exports = router;