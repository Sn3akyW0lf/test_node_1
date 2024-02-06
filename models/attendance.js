const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Attendance = sequelize.define('attendance', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  attendance_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  attendance: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Attendance;