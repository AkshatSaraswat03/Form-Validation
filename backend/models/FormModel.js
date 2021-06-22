const mongoose = require('mongoose')

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})


const Form = mongoose.model('Form', formSchema)

module.exports = Form
