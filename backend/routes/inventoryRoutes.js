const express = require('express')
const router = express.Router()
const {
    getInventory,
    setInventory,
    deleteInventory,
} = require('../controllers/inventoryController')

router.route('/inventory').get(getInventory).post(setInventory)
router.route('/inventory/:id').delete(deleteInventory)

module.exports = router