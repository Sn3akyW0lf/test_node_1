const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('student', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  ph_student: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  ph_parent: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
});

module.exports = Student;