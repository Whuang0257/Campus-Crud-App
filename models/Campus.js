const Sequelize = require('sequelize');
const db = require('../config/database');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING
  },
  studentidarray: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
});

Campus.assiociate = (models) => {
  Campus.hasMany(models.Student, {as: 'Students', foreignKey: 'id'});
}

module.exports = Campus;