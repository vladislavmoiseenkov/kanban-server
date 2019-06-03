const mongoose = require('mongoose');

const { Schema } = mongoose;

const Task = new Schema({
  columnId: String,
  id: Schema.ObjectId,
  name: String,
});

module.exports = mongoose.model('Task', Task);
