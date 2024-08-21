const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discounts');

router.post('/', discountController.createDiscount);
router.get('/', discountController.getAllDiscounts);
router.get('/:discount_id', discountController.getDiscountById);
router.put('/:discount_id', discountController.updateDiscount);
router.delete('/:discount_id', discountController.deleteDiscount);

module.exports = router;
