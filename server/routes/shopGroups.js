const express = require('express');
const router = express.Router();
const shopGroups = require('../controllers/shopGroups');

router.post('/', shopGroups.createShopGroup);
router.get('/', shopGroups.getAllShopGroups);
router.get('/:id', shopGroups.getShopGroupById);
router.put('/:id', shopGroups.updateShopGroup);
router.delete('/:id', shopGroups.deleteShopGroup);

module.exports = router;
