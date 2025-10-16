const { errorHandler } = require('./error.middleware');
const { loggerMiddleware } = require('./logger.middleware');
const { rateLimitMiddleware } = require('./rateLimit.middleware');
const { validationMiddleware } = require('./validation.middleware');
const { authMiddleware } = require('./auth.middleware');

module.exports = {
  errorHandler,
  loggerMiddleware,
  rateLimitMiddleware,
  validationMiddleware,
  authMiddleware
};