const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Campus = require('../models/Campus');
const Sequelize = require('sequelize');


router.get('/', (req, res) => 
  Campus.findAll()
    .then(campuses => res.render('campuses', {
      campuses
      }))
    .catch(err => res.render('error', {error: err})));


router.get('/addcampus', (req, res) => res.render('addcampus'));

router.post('/addcampus', (req, res) => {
  let { name, imageUrl, address, description } = req.body;
  let errors = [];

  // Validate Fields
  if(!name) {
    errors.push({ text: 'Please add a name' });
  }
  if(!address) {
    errors.push({ text: 'Please add a address' });
  }
  if(!imageUrl) {
    imageUrl = 'https://via.placeholder.com/140x100';
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('addcampus', {
      errors, name, imageUrl, address, description
    });
  } else {
    // Insert into table
    Campus.create({
      name,
      imageUrl,
      address,
      description,
    })
      .then(campus => res.redirect('/campuses'))
      .catch()
  }
});

module.exports = router;