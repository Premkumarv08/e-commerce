const { API_RESPONSES } = require("../config/constants");

/**
 * Sends a structured JSON response.
 * @param {import('express').Response} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {any} data - The payload to send.
 */
const jsonResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ status: API_RESPONSES.SUCCESS, data });
};

module.exports = { jsonResponse };