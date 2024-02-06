const Attendance = require('../models/attendance');
const Student = require('../models/student');

exports.getIndex = async (req, res, next) => {
    const curr_date = new Date();
    const date = curr_date.setHours(0, 0, 0, 0);

    // const students = await req.user.getStudents();
    const attendances = await req.user.getAttendances({
        where: {
            attendance_date: date
        }
    });
    console.log(curr_date);
    console.log(attendances);
    if (attendances.length !== 0) {
        res.render('attendance/date-attendance', {
            pageTitle: 'Current Day Attendance',
            // studs: students,
            attends: attendances, 
            path: '/today'
        });
    } else {
        res.render('attendance/index', {
            pageTitle: 'Current Day',
            path: '/'
        });
    }

};

exports.getAddDate = (req, res, next) => {
    res.render('attendance/edit-date', {
        pageTitle: 'Custom Date',
        path: '/date'
    });
};

exports.postAddDate = async (req, res, next) => {
    // console.log(req.body.attend_date);
    try {
        const date = new Date(req.body.attend_date);
        console.log(date);
        const students = await req.user.getStudents();
        const attendances = await req.user.getAttendances({
            where: {
                attendance_date: date
            }
        })
        console.log(attendances.length);

        if (attendances.length !== 0) {
            console.log('Found Something');
            res.render('attendance/date-attendance', {
                pageTitle: 'Current Day Attendance',
                // studs: students,
                attends: attendances, 
                path: '/result'
            });
        } else {
            res.render('attendance/attendance-form', {
                pageTitle: 'Record Attendance',
                studs: students,
                date: date,
                path: '/mark-attendace'
            });
        }
    } catch (err) {
        console.log(err);
    }


};

exports.getReport = async (req, res, next) => {
    const attendances = await Attendance.findAll();
    console.log(attendances);
    res.render('attendance/report', {
        pageTitle: 'Attendance Report',
        path: '/report'
    });
};

exports.postAddAttendance = async (req, res, next) => {
    try {
        console.log(req.body);
        const date = new Date(req.body.date);
        const keys = Object.keys(req.body);
        let resultSet = [];
        console.log(date);
        console.log(Object.keys(req.body));
        for (let i = 0; i < keys.length - 1; i++) {
            const result = await req.user.createAttendance({
                attendance_date: date,
                attendance: req.body[keys[i]],
                name: keys[i]
            });
            resultSet.push(result);
        }
        console.log(resultSet);
        console.log('Successfully Logged Attendance');

    } catch (err) {
        console.log(err);
    }
}
