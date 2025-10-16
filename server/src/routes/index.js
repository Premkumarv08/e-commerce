const express = require('express');
const router = express.Router();

const productRoutes = require('./product.routes');
const authRoutes = require('./auth.routes');
const paymentRoutes = require('./payment.routes');

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
