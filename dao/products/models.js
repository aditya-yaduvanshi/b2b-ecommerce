const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  stock: Number,
  specs: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts' 
  }
})


module.exports = mongoose.model('Products', ProductSchema)