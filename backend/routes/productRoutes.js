const express = require('express')
const router = express.Router()
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

router.route('/').get(getProducts).post(createProduct)
router.route('/update').put(updateProduct)
router.route('/:id').delete(deleteProduct).put(updateProduct)

module.exports = router