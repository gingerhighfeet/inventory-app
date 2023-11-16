const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      },
    price: {
        type: String,
        required: [true, 'Please add a price'],
      },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
      },
    invoiceNumber: {
        type: String,
        required: [true, 'Please enter an invoice number']
    }
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Product', productSchema)