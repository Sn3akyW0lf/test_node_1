const path = require('path');

const express = require('express');

const studentController = require('../controllers/student');

const router = express.Router();

router.get('/add-student', studentController.getAddStudent);

router.post('/add-student', studentController.postAddStudent);

module.exports = router;
