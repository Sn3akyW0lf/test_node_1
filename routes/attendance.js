const path = require('path');

const express = require('express');

const attendanceController = require('../controllers/attendance');

const router = express.Router();

router.get('/', attendanceController.getIndex);

router.get('/report/', attendanceController.logAttendance);

module.exports = router;