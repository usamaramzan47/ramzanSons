
const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();
require('dotenv').config();

// users routes 
router.post('/', getAllUsers)
module.exports = router;