const { ApiError } = require("../utils");
const { HTTP_STATUS } = require("../config/constants");

/**
 * Middleware to validate request body against a Zod schema.
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against.
 * @returns {import('express').RequestHandler}
 */
const validationMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      next(new ApiError(HTTP_STATUS.BAD_REQUEST, `Validation failed: ${errorMessages}`));
    } else {
      next(new ApiError(HTTP_STATUS.BAD_REQUEST, "Validation failed"));
    }
  }
};

module.exports = { validationMiddleware };