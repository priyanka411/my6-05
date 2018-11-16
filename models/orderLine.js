/**
 * Orderline Scheme to store Orderline details
 * @author Priyanka Bonam
 */

const mongoose = require('mongoose')

const OrderLineItemSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  orderID: {
    type: Number,
    required: true
  },
  lineNumber: {
    type: Number,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true, 
    default: 1
  }

})
module.exports = mongoose.model('OrderLineItem', OrderLineItemSchema)
