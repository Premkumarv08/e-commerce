const authService = require("../services/auth.service");
const logger = require("../config/logger");
const { HTTP_STATUS } = require("../config/constants");
const { jsonResponse } = require("../utils");

class AuthController {
  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.signup({ email, password, name });
      return jsonResponse(res, HTTP_STATUS.CREATED, result);
    } catch (error) {
      logger.error("Signup error:", error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      return jsonResponse(res, HTTP_STATUS.OK, result);
    } catch (error) {
      logger.error("Login error:", error);
      next(error);
    }
  }
}

module.exports = new AuthController();
