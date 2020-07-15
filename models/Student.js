const Sequelize = require('sequelize');
const db = require('../config/database');

const Student = db.define('student', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'http://fairlaneclub.com/wp-content/uploads/2013/12/generic_person_silhouette_sq.jpg'
	},
	gpa: {
		type: Sequelize.DECIMAL(2, 1),
		allowNull: false

	}
});
module.exports = Student;