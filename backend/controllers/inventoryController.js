const asyncHandler = require('express-async-handler')

const Inventory = require('../models/inventoryModel')

//@desc Get inventory items
//@route GET /api/inventory
//@access Private
const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Promise.all(Inventory.map(async (Inventory) => {
        return { 
            name: Inventory.inventoryItem,
            price: Inventory.price, 
            quantity: Inventory.quantity,
            }
        }
    ))

    res.status(200).json(inventory)
})

// @desc    Set inventory
// @route   POST /api/inventory
// @access  Private
const setInventory = asyncHandler(async (req, res) => {
    const { inventoryItem, price, quantity } = req.body

  if (!inventoryItem || !price || !quantity) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const inventory = await Inventory.create({
        inventoryItem,
        price,
        quantity,
    })
  
   res.status(200).json(inventory)
  }) 

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteInventory = asyncHandler(async (req, res) => {
    const inventory = await Promise.all(Inventory.find(async inventory => {
    
        if(!inventory){
            res.status(400)
            throw new Error('No inventory found')
        }
        
        await inventory.remove()
    }))
    
    

    res.status(200).json({message: successful})
})

module.exports = {
    getInventory,
    setInventory,
    deleteInventory,
} 
