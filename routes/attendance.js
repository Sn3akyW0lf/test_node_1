const path = require('path');

const express = require('express');

const attendanceController = require('../controllers/attendance');

const router = express.Router();

router.get('/', attendanceController.getIndex);

router.get('/date', attendanceController.getAddDate);

router.post('/date', attendanceController.postAddDate);

router.post('/commit', attendanceController.postAddAttendance);

router.get('/report', attendanceController.getReport);

module.exports = router;