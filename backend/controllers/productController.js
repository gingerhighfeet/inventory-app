const asyncHandler = require('express-async-handler')

const Products = require('../models/productModel')

//@desc Get products 
//@route GET /api/products
//@access Private
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Products.find({}, { __v: 0 }); // Exclude _id and __v fields from the response

        const formattedProducts = products.map(item => ({
            _id: item._id,
            category: item.category,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
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
    const { category, name, price, quantity } = req.body;
    
  if (!category || !name || !price || !quantity ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const products = await Products.create({
        category, 
        name,
        price,
        quantity,
    });
  
   res.status(200).json(products);
  });

// @desc    Update products
// @route   UPDATE /api/products/update
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const updateArray = req.body;

    // Validate if all objects in updateArray have necessary fields for filtering
    if (updateArray.some(item => !item.name || !item.price || !item.quantity)) {
      return res.status(400).json({ message: 'One or more items in updateArray is missing a necessary field for filtering' });
    }

    // Use updateMany for each name
    const updatePromises = updateArray.map(async (item) => {
      const filter = { name: item.name };

      // Log filter for debugging
      console.log('Filter:', filter);

      // Fetch the existing product from the database
      const existingProduct = await Products.findOne(filter);

      if (!existingProduct) {
        // Handle the case where the product doesn't exist in the database
        console.log(`Product '${item.name}' not found. Skipping update.`);
        return null;
      }

      // Calculate the new quantity by adding the existing quantity and the new quantity
      const newQuantity = Number(existingProduct.quantity) + Number(item.quantity);

      // Construct the update object
      const updateObject = {
        $set: {
          price: item.price,
          quantity: newQuantity,
        },
        $setOnInsert: { // Set on insert to ensure it's set if the document is inserted
          name: item.name,
        },
      };

      // Use updateOne to update the document for the current name
      const result = await Products.updateOne(
        filter,
        updateObject,
        { upsert: true, new: true } // Upsert to insert if the document doesn't exist
      );

      // Log the result for debugging
      console.log('Result:', result);

      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
        console.log('No document modified or upserted for name:', item.name);
      }

      return { name: item.name, updatedProduct: result };
    });

    // Remove null values (skipped updates) from the updatedResults array
    const validUpdatedResults = updatePromises.filter(result => result !== null);

    res.status(200).json({ message: 'Products updated successfully', updatedProducts: validUpdatedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
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
    updateProduct,
    deleteProduct,
} 
