const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
  {
    inventoryItem: {
      type: String,
      required: [true, 'Please add an inventory item name'],
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
  }
)

module.exports = mongoose.model('inventory', inventorySchema)