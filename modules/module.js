const mongoose = require('mongoose');

const customerschema = new mongoose.Schema({
    name:String,
    phone:String
});

module.exports = mongoose.model('customer',customerschema);