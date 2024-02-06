const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Attendance = require('./models/attendance');
const Student = require('./models/student');
const User = require('./models/user');

// var cors = require('cors');

const app = express();

// app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

const attendanceRoutes = require('./routes/attendance');
const studentRoutes = require('./routes/student');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use(attendanceRoutes);
app.use(studentRoutes);

app.use(errorController.get404);

Student.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
User.hasMany(Student);
Attendance.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Attendance);

async function start() {
    try{
         let result = await sequelize.sync();
        //  let result = await sequelize.sync({ force: true });         
         let user = await User.findByPk(1);

         if (!user){
            await User.create({ name: 'Sid', email: 'siddhesh.meher@protonmail.com'});
         }

         app.listen(4000);
    } catch (err) {
        console.log(err);
    }
}

start();



