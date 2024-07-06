const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cnfPassword: {
    type: String,
    required: true
  }
})

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate