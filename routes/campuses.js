const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Campus = require('../models/Campus');
const { workerData } = require('worker_threads');

//renders all campuses
router.get('/', (req, res) => 
  Campus.findAll()
    .then(campuses => res.render('campuses', {
      campuses
      }))
    .catch(err => res.render('error', {error: err}))
);

//view a specific campus
router.get('/view/:id', (req, res) => {
  Campus.findByPk(req.params.id,{
  }
    )
    .then(campus => {
      res.render('viewcampus', {
      campuses: [campus]
      
      })})
    .catch(err => res.render('error', {error: err}))
});

//renders campus edit
router.get('/view/:id/editcampus', (req, res) => {
  Campus.findByPk(req.params.id)
    .then(campus => {
      res.render('editcampus', {
      include: [Students],
      campuses: [campus],
      })})
    .catch(err => res.render('error', {error: err}))
});

//edit a campus and sends info
router.post('/view/:id/editcampus', (req, res) => {
  let {name, imageUrl, address, description} = req.body;
  let id = req.params.id;
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

  if(errors.length > 0) {
    res.redirect((`/campuses/view/${req.params.id}/editcampus`));
  } else {
    Campus.update({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      description: req.body.description
    },{
      where: {
        id: req.params.id
      }
    }).then(campus => res.redirect(`/campuses/view/${req.params.id}`))
    .catch(err => res.render('error', {error: err}))
  }
});

//delete a campus
router.delete('/view/:id', (req, res) => {
  Campus.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.redirect('/campuses'))
    .catch(err => res.render('error', {error: err}))
});

//loads add campus page
router.get('/addcampus', (req, res) => res.render('addcampus'));

//add a campus
router.post('/addcampus', (req, res) => {
  let {name, imageUrl, address, description} = req.body;
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

router.get('/nostudents', (req, res) => 
  Campus.findAll({
    where: {
      studentidarray: null
    }
  })
    .then(campuses => res.render('viewcampus', {
      campuses
      }))
    .catch(err => res.render('error', {error: err}))
);

//edit a campus and sends info
router.post('/view/:id/addstudent', (req, res) => {
  let {studentname} = req.body;
  Campus.update({
    
  },{
    where: {
      id: req.params.id
    }
  }).then(campus => res.redirect(`/campuses/view/${req.params.id}`))
  .catch(err => res.render('error', {error: err}))
});

module.exports = router;