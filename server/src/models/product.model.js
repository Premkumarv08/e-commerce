const { prisma } = require("../config/database");

class ProductModel {
  /**
   * Fetches all products from the database.
   * @returns {Promise<Product[]>} A promise that resolves to an array of products.
   */
  async findProducts() {
    return await prisma.product.findMany();
  }

  /**
   * Fetches products from the database by their IDs.
   * @param {number[]} productIds - An array of product IDs.
   * @returns {Promise<Product[]>} A promise that resolves to an array of products.
   */
  async findProductsByIds(productIds) {
    return prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });
  }
}

module.exports = new ProductModel();
