const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts'
  },
  address: {
    house: String,
    locality: String,
    place: String,
    city: String,
    state: String,
    pincode: Number
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
  status : String
})


module.exports = mongoose.model('Orders', OrderSchema)