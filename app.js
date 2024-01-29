const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Attendance = require('./models/attendance');
const Student = require('./models/student');


var cors = require('cors');

const app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));

const attendanceRoutes = require('./routes/attendance');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/attendance', attendanceRoutes);

Attendance.belongsTo(Student, {constraints: true, onDelete: 'CASCADE'});
Student.hasMany(Attendance);

async function start() {
    try{
         let result = await sequelize.sync();
         app.listen(4000);
    } catch (err) {
        console.log(err);
    }
}

start();



