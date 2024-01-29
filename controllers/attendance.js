const Attendance = require('../models/attendance');
const Student = require('../models/student');

exports.getIndex = (req, res, next) => {
    res.sendFile('index.html', { root: './views/attendance/' });
};

exports.logAttendance = (req, res, next) => {
    res.sendFile('report.html', {root: './views/attendance/' })
}

exports.postAddAttendance = (req, res, next) => {
    try {
        console.log(req.body);
        const body = req.body;
        const attDate = req.date;
    } catch (err) {
        console.log(err);
    }
}

exports.getAttendance = (req, res, next) => {
    try{
        const data = await
    } catch (err) {
        console.log(err);
    }
}