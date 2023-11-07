const express = require('express')
const router = express.Router()
const {
    getInventory,
    setInventory,
    deleteInventory,
} = require('../controllers/inventoryController')

router.route('/').get(getInventory).post(setInventory)
router.route('/:id').delete(deleteInventory)

module.exports = router