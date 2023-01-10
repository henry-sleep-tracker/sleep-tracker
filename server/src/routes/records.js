const { Router } = require("express");
const router = Router();

/* ==================== Import Controllers ======================== */

const {
  getRecords,
  getRecords_by_id,
  getRecords_by_id_unformat,
  post_new_record,
} = require("../controllers/records_controller.js");

const {
  newCoffeeSize,
  getCoffeeSizeList,
  coffee_size_by_id,
} = require("../controllers/coffeeSize_controller.js");

const {
  getDrinks,
  newDrink,
  drink_type_by_id,
} = require("../controllers/drink_controller.js");

const {
  getAcitivities,
  newActivity,
  activities_by_id,
} = require("../controllers/activity_controller");

/* ==================== Import Middlewares Validators ======================== */

const { new_record_validator } = require("../middlewares/record_validator.js");

const {
  coffeeSizeValidator,
} = require("../middlewares/coffeSize_validator.js");

const { drinkValidator } = require("../middlewares/drink_validator.js");

const { activityValidator } = require("../middlewares/activity_validator.js");

//> ==================== End Points ======================== <//

/* ==================== Records ======================== */

router.get("/", getRecords);

router.get("/:id", getRecords_by_id);

router.get("/unformat/:id", getRecords_by_id_unformat);

router.post("/", new_record_validator, post_new_record);

/* ==================== Coffee Size ======================== */

router.get("/coffeesize", getCoffeeSizeList);

router.get("/coffeesize/:id", coffee_size_by_id);

router.post("/coffeesize", coffeeSizeValidator, newCoffeeSize);

/* ==================== Drinks ======================== */

router.get("/drink", getDrinks);

router.get("/drink/:id", drink_type_by_id);

router.post("/drink", drinkValidator, newDrink);

/* ==================== Activity ======================== */

router.get("/activity", getAcitivities);

router.get("/activity/:id", activities_by_id);

router.post("/activity", activityValidator, newActivity);

module.exports = router;
