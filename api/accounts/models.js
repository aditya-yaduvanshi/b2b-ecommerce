const mongoose = require('mongoose')


const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  access: {
    type: String
  },
  refresh: {
    type: String
  },
  superUser: {
    type: Boolean
  }
})


module.exports = mongoose.model('Accounts', AccountSchema)