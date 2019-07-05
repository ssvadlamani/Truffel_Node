const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  username: String,
  sickLeaves: Number,
  earnLeaves: Number,
  optionalLeave:Number,
  compOff : Number
});

module.exports = mongoose.model('Leave', LeaveSchema);
