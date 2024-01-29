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
      type: Sequelize.DATE,
      allowNull: false
  },
  attendance: {
      type: Sequelize.BOOLEAN
  }
});

module.exports = Attendance;