const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20, minlength: 5 }
});

module.exports = mongoose.model('Department', departmentSchema);
