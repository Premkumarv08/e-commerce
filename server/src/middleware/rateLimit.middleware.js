const { rateLimit } = require('express-rate-limit');

module.exports = { 
  rateLimitMiddleware: rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
      status: 'error',
      message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false
  })
};