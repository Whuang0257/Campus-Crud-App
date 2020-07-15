const Sequelize = require('sequelize');
const db = require('../config/database');

const Student = db.define('student', {
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	imageUrl: {
		type: Sequelize.STRING
	},
	gpa: {
		type: Sequelize.DECIMAL(2,1)
	}
});
module.exports = Student;