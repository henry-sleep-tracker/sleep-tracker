const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const {
  getRecords,
  post_new_record,
} = require("../controllers/newRecord_controller.js");

const {
  newCoffeeSize,
  getCoffeeSizeList,
} = require("../controllers/coffeeSize_controller.js");

const {
  getDrinks,
  newDrink,
} = require("../controllers/newDrink_controller.js");

const {
  getAcitivities,
  newActivity,
} = require("../controllers/activity_controller");

/* ==================== Import Validators ======================== */

const {
  new_record_validator,
} = require("../middlewares/newRecord_validator.js");

const {
  coffeeSizeValidator,
} = require("../middlewares/coffeSize_validator.js");

const { drinkValidator } = require("../middlewares/newDrink_validator.js");

const { activityValidator } = require("../middlewares/activity_validator.js");

//> ==================== End Points ======================== <//

/* ==================== Records ======================== */

router.get("/", getRecords);

router.post("/", new_record_validator, post_new_record);

/* ==================== Coffee Size ======================== */

router.get("/coffeesize", getCoffeeSizeList);

router.post("/coffeesize", coffeeSizeValidator, newCoffeeSize);

/* ==================== Drinks ======================== */

router.get("/drink", getDrinks);

router.post("/drink", drinkValidator, newDrink);

/* ==================== Activity ======================== */

router.get("/activity", getAcitivities);

router.post("/activity", activityValidator, newActivity);

module.exports = router;
