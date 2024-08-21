const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/orderDetails');

// OrderDetails routes
router.post('/', orderDetailsController.createOrderDetail);
router.get('/', orderDetailsController.getAllOrderDetails);
router.get('/:order_id', orderDetailsController.getOrderDetailsByOrderId);
router.put('/:order_detail_id', orderDetailsController.updateOrderDetail);
router.delete('/:order_detail_id', orderDetailsController.deleteOrderDetail);

module.exports = router;