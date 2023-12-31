const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Please add a category']
    },
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
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Product', productSchema)