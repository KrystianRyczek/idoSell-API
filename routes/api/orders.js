const express = require('express')
const orders = require('../../controllers/orders/orders.js')
const router = express.Router()


router.get('/', orders.getOrders)

router.get('/:orderId', orders.getOrderById)

router.get('/worth/:min-:max', orders.getOrderByWorth)

router.post('/', orders.addOrder)

module.exports = router

