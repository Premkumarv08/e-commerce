const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { productModel } = require("../models");
const { ApiError } = require("../utils");
const { HTTP_STATUS } = require("../config/constants");

class PaymentService {
  /**
   * Creates a Stripe Payment Intent.
   * It calculates the order amount on the server to prevent client-side manipulation.
   * @param {Array} items - The items in the cart.
   * @returns {Promise<{clientSecret: string}>}
   */
  async createPaymentIntent(items) {
    if (!items || items.length === 0) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Cart is empty.");
    }

    const productIds = items.map((item) => item.id);
    const productsFromDb = await productModel.findProductsByIds(productIds);
    const priceMap = new Map(productsFromDb.map((p) => [p.id, p.price]));
    const totalAmount = items.reduce((sum, item) => {
      const price = priceMap.get(item.id);
      return sum + (price || 0) * item.quantity;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: "usd",
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}

module.exports = new PaymentService();
