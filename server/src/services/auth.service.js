const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { MESSAGES, HTTP_STATUS } = require("../config/constants");
const { ApiError } = require("../utils");
const logger = require("../config/logger");

class AuthService {
  async signup({ email, password, name }) {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      logger.error("Existing user error:", MESSAGES.USER_ALREADY_EXISTS);
      throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.USER_ALREADY_EXISTS);
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.createUser({ email, password: hashedPassword, name });
      // Exclude password from the returned user object
      const { password: _, ...userWithoutPassword } = user;
      return issueToken(userWithoutPassword);
    } catch (error) {
      logger.error("Signup error:", error);
      throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, "An error occurred during signup.");
    }
  }

  async login({ email, password }) {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      logger.error("Unauthorized error:", MESSAGES.INVALID_CREDENTIALS);
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error("Invalid credentials error:", MESSAGES.INVALID_CREDENTIALS);
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
    }

    const { password: _, ...userWithoutPassword } = user;
    return issueToken(userWithoutPassword);
  }
}

const issueToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { user, token };
};

module.exports = new AuthService();
