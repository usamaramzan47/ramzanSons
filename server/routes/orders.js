const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
// Orders routes
router.post('/', ordersController.createOrder);
router.get('/', ordersController.getAllOrders);
router.get('/:order_id', ordersController.getOrderById);
router.put('/:order_id', ordersController.updateOrder);
router.delete('/:order_id', ordersController.deleteOrder);

module.exports = router;