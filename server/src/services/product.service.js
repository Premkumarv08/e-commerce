const { productModel } = require("../models");
const logger = require("../config/logger");
const { HTTP_STATUS } = require("../config/constants");
const { ApiError } = require("../utils");

class ProductService {
  async getAllProducts() {
    try {
      return productModel.findProducts();
    } catch (error) {
      logger.error("Get products service error:", error);
      throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Failed to retrieve products.");
    }
  }
}

module.exports = new ProductService();
