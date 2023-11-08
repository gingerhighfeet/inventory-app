const asyncHandler = require('express-async-handler')

const Inventory = require('../models/inventoryModel')

//@desc Get inventory items
//@route GET /api/inventory
//@access Private
const getInventory = asyncHandler(async (req, res) => {
    try {
        const inventory = await Inventory.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields from the response

        const formattedInventory = inventory.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        res.status(200).json(formattedInventory);
    } catch (error) {
        // Handle error, for example, send an error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Set inventory
// @route   POST /api/inventory
// @access  Private
const setInventory = asyncHandler(async (req, res) => {
    const { name, price, quantity } = req.body;
    
  if (!name || !price || !quantity) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const inventory = await Inventory.create({
        name,
        price,
        quantity,
    });
  
   res.status(200).json(inventory);
  });

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteInventory = asyncHandler(async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        await Inventory.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {
    getInventory,
    setInventory,
    deleteInventory,
} 
