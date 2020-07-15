const Sequelize = require('sequelize');
const db = require('../config/database');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});
module.exports = Campus;