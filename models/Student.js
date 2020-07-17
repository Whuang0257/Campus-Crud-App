const Sequelize = require('sequelize');
const db = require('../config/database');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  gpa: {
    type: Sequelize.DOUBLE,
  },
  campusid: {
    type: Sequelize.INTEGER,
  }
});

Student.associate = (models) => {
  Student.belongsTo(models.Campus, {as: 'Campuses', foreignKey: 'campusid'});
}

module.exports = Student;