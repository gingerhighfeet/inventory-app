const express = require('express')
const router = express.Router()
const {
    getProducts,
    setProduct,
    deleteProduct,
} = require('../controllers/productController')

router.route('/').get(getProducts).post(setProduct)
router.route('/:id').delete(deleteProduct)

module.exports = router