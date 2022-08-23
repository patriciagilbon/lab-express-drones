const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model')
// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then(AllDrones => {
    console.log(`All drones avialable ${AllDrones}`)
    res.render('list', {drones: AllDrones});
  })
  .catch(err => console.log(`${err}`))
});

router.get('/drones/create', (req, res, next) => {
  res.render('create-form');
});

router.post('/drones/create', (req, res, next) => {
  const {name, propellers, maxSpeed} = req.body;
  Drone.create({name, propellers, maxSpeed})
  .then(() => {
    res.redirect('/')
  })
  .catch(err => console.log(`${err}`))
});

router.get('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params;
  Drone.findById(id)
  .then(DroneToEdit => res.render('update-form', DroneToEdit))
  .catch(err => console.log(`${err}`))
});

router.post('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params;
  const {name, propellers, maxSpeed} = req.body;
  console.log(name)
  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed}, { new: true })
    .then(NewDrone => {
      console.log(`has been updated`)
      res.redirect('/')
    })
    .catch(err => console.log(`Didn't work ${err}`))
});

router.get('/drones/:id/delete', (req, res, next) => {
  const {id} = req.params;
  console.log('id')
  console.log(id)
  Drone.findByIdAndDelete(id)
  .then(DeltedDrone => {
    console.log(`has been deleted`)
    res.redirect('/')
  })
    .catch(err => console.log(`Didn't work ${err}`))
});

module.exports = router;
