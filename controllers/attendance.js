const Attendance = require('../models/attendance');
const Student = require('../models/student');

exports.getIndex = async (req, res, next) => {
    const date = new Date();

    // const students = await req.user.getStudents();
    const attendances = await req.user.getAttendances({
        where: {
            attendance_date: date
        }
    });
    // console.log(curr_date);
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
                pageTitle: 'Recorded Attendance',
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
    // const attendances = await req.user.getAttendances();
    const students = await req.user.getStudents();
    let names = [];
    let total = [];
    let attended = [];
    let perc = [];

    for (let i = 0; i < students.length; i++) {
        names.push(students[i].name);
    }
    // console.log('names', names);

    for (let i = 0; i < names.length; i++) {
        let temp = await req.user.getAttendances({
            where: {
                name: names[i]
            }
        });
        total.push(temp.length);
    }
    // console.log('total', total);

    for (let i = 0; i < names.length; i++) {
        let temp = await req.user.getAttendances({
            where: {
                name: names[i],
                attendance: 'present'
            }
        });
        attended.push(temp.length)
    }
    // console.log('attended', attended);

    for (let i = 0; i < attended.length; i++) {
        let temp = (attended[i] * 100) / total[i];
        let tp = temp.toFixed(2)
        perc.push(tp);
    }
    console.log(perc[1] > 90);

    res.render('attendance/report', {
        pageTitle: 'Attendance Report',
        names: names,
        total: total,
        attended: attended,
        percent: perc,
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
        res.render('attendance/date-attendance', {
            pageTitle: 'Recorded Attendance',
            // studs: students,
            attends: resultSet,
            path: '/result'
        });

    } catch (err) {
        console.log(err);
    }
}
