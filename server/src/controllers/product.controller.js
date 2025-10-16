const { productModel } = require('../models');
const { jsonResponse } = require('../utils');
const { HTTP_STATUS } = require('../config/constants');

class ProductController {
  async getProducts(req, res, next) {
    try {
      const products = await productModel.findProducts();
      return jsonResponse(res, HTTP_STATUS.OK, products);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
