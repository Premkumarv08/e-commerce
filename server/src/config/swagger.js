const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description: "API documentation for the e-commerce application.",
    contact: {
      name: "Prem",
      email: "premkumarv08@gmail.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}/api`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Use absolute paths for robustness
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../../docs/**/*.yaml"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;