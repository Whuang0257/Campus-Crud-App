const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Student = require('../models/Student');
const Sequelize = require('sequelize');


router.get('/', (req, res) => 
  Student.findAll()
    .then(students => res.render('students', {
        students
      }))
    .catch(err => res.render('error', {error: err})));

router.get('/addstudent', (req, res) => res.render('addstudent'));

router.get('/view/:id', (req, res) => {
  Student.findByPk(req.params.id)
    .then(student => {
      res.render('viewstudents', {
      students: [student]
      })})
    .catch(err => res.render('error', {error: err}))
});

router.get('/view/:id/editstudent', (req, res) => {
  Student.findByPk(req.params.id)
    .then(student => {
      res.render('editstudent', {
      students: [student]
      })})
    .catch(err => res.render('error', {error: err}))
});

router.delete('/view/:id', (req, res) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.redirect('/students'))
    .catch(err => res.render('error', {error: err}))
});

router.get('/addcampus', (req, res) => res.render('addcampus'));

router.post('/view/:id/editstudent', (req, res) => {
  let { firstName, lastName , email, imageUrl, gpa } = req.body;
  let id = req.params.id;
  let errors = [];

  // Validate Fields
  if(!firstName) {
    errors.push({ text: 'Please add a first name' });
  }
  if(!lastName) {
    errors.push({ text: 'Please add a last name' });
  }
  if(!email) {
    errors.push({ text: 'Please add a valid email' });
  }
  if(!imageUrl) {
    imageUrl = 'https://via.placeholder.com/140x100';
  }
  if(!gpa || gpa > 4) {
    errors.push({ text: 'Please add a valid gpa' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.redirect(res.redirect(`/students/view/${req.params.id}/editstudent`));
  } else {
    Student.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl,
      gpa: req.body.gpa,
    },{
      where: {
        id: req.params.id
      }
    }).then(student => res.redirect(`/students/view/${req.params.id}`))
    .catch(err => res.render('error', {error: err}))
  }
});

router.post('/addstudent', (req, res) => {
  let { firstName, lastName , email, imageUrl, gpa } = req.body;
  let errors = [];

  // Validate Fields
  if(!firstName) {
    errors.push({ text: 'Please add a first name' });
  }
  if(!lastName) {
    errors.push({ text: 'Please add a last name' });
  }
  if(!email) {
    errors.push({ text: 'Please add a valid email' });
  }
  if(!imageUrl) {
    imageUrl = 'https://via.placeholder.com/140x100';
  }
  if(!gpa || gpa > 4) {
    errors.push({ text: 'Please add a valid gpa' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('addstudent', {
      errors, firstName, lastName, email, imageUrl, gpa
    });
  } else {
    // Insert into table
    Student.create({
        firstName, 
        lastName, 
        email, 
        imageUrl, 
        gpa
    })
      .then(student => res.redirect('/students'))
      .catch()
  }
});

module.exports = router;