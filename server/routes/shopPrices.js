const express = require('express');
const router = express.Router();
const shopPricesController = require('../controllers/shopPrices');

router.post('/', shopPricesController.createShopPrice);
router.get('/', shopPricesController.getAllShopPrices);
router.get('/:id', shopPricesController.getShopPriceById);
router.get('/shop/id/:shop_id', shopPricesController.getShopRatesByShopId);
router.get('/shop/name/:shop_name', shopPricesController.getShopRatesByShopName);
router.put('/:id', shopPricesController.updateShopPrice);
router.delete('/:id', shopPricesController.deleteShopPrice);

module.exports = router;
