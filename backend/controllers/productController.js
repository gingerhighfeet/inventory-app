const asyncHandler = require('express-async-handler')

const Products = require('../models/productModel')

//@desc Get products 
//@route GET /api/products
//@access Private
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Products.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields from the response

        const formattedProducts = products.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        res.status(200).json(formattedProducts);
    } catch (error) {
        // Handle error, for example, send an error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Set product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, quantity } = req.body;
    
  if (!name || !price || !quantity) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const products = await Products.create({
        name,
        price,
        quantity,
    });
  
   res.status(200).json(products);
  });

// @desc    Delete products
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Products.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Products.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
} 
