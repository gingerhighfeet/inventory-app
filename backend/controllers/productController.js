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
    if (updateArray.some(item => !item.category || !item.name || !item.price || !item.quantity)) {
      return res.status(400).json({ message: 'One or more items in updateArray is missing a necessary field for filtering' });
    }

    // Define an array of categories you want to filter on
    const categoriesToFilter = ['Dry Storage', 'Produce', 'Freezer'];

    // Use updateMany for each category
    const updatePromises = categoriesToFilter.map(async (category) => {
      const filter = { category };

      // Log filter for debugging
      console.log('Filter:', filter);

      // Filter updateArray to include only items with the specified category
      const filteredUpdateArray = updateArray.filter(item => item.category === category);

      // Create an array of update objects for each document in the current category
      const updateObjects = filteredUpdateArray.map(item => ({
        $set: {
          price: item.price,
          quantity: item.quantity,
        },
      }));

      // Use updateMany to update documents for the current category
      const result = await Products.updateMany(
        filter,
        updateObjects,
        { new: true } // To return the updated documents
      );

      // Log the result for debugging
      console.log('Result:', result);

      if (result.modifiedCount === 0) {
        console.log('No documents modified for category:', category);
      }

      return { category, updatedProducts: result };
    });

    // Wait for all update promises to resolve
    const updatedResults = await Promise.all(updatePromises);

    res.status(200).json({ message: 'Products updated successfully', updatedProducts: updatedResults });
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
