const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema (
    {
      invoiceDate: {
        type: Date,
        required: [true, 'Please add an invoice date'],
        },
      invoiceNumber: {
          type: Number,
          required: [true, 'Please add an invoice number'],
        },
      vendor: {
          type: String,
          required: [true, 'Please add a vendor'],
        },
        products: [
          {
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
    },
    {
      timestamps: true,
    })
  
  module.exports = mongoose.model('Invoice', invoiceSchema)