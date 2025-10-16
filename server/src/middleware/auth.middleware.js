const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils");
const { HTTP_STATUS } = require("../config/constants");
const { userModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication token is missing or invalid."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findUserById(decoded.id);

    if (!user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not found."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token."));
  }
};

module.exports = { authMiddleware };
