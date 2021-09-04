const express = require('express');
const router = express.Router();
const facilityController = require('./FacilityController');

router.get('/getAll', facilityController.getAll);

module.exports = router;
