const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const DroneSchema = new Schema({
    name: String, 
    propellers: Number,
    maxSpeed: Number
})

module.exports =  model('Drone', DroneSchema);