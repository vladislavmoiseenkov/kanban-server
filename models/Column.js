const mongoose = require('mongoose');

const { Schema } = mongoose;

const Column = new Schema({
  id: Schema.ObjectId,
  name: String,
});

module.exports = mongoose.model('Column', Column);
