const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');



/**
 * @openapi
 * /products:
 *   get:
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get('/', productController.getProducts);

module.exports = router;
