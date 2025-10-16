const logger = require("../config/logger");
const { paymentService } = require("../services");
const { HTTP_STATUS } = require("../config/constants");

class PaymentController {
  async createPaymentIntent(req, res, next) {
    try {
      const { items } = req.body;
      const result = await paymentService.createPaymentIntent(items);
      res.status(HTTP_STATUS.OK).send(result);
    } catch (error) {
      logger.error("Create Payment Intent error:", error);
      next(error);
    }
  }
}

module.exports = new PaymentController();
