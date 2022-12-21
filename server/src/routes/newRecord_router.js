const { Router } = require('express');
const router = Router();

const { post_new_record } = require('../controllers/newRecord_controller.js');
const {
  new_record_validator,
} = require('../middlewares/newRecord_validator.js');

router.post('/', new_record_validator, post_new_record);

module.exports = router;
