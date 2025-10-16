# E-commerce API Server

This is the backend for the e-commerce platform, built with Node.js, Express, and Prisma. It provides a RESTful API for managing products, users, and payments.

## ✨ Features

*   **RESTful API**: Endpoints for authentication, products, and payments.
*   **Authentication**: JWT-based authentication for secure access.
*   **ORM**: Prisma for type-safe database access.
*   **Payment Processing**: Stripe integration for creating payment intents.
*   **API Documentation**: Automatically generated and interactive API documentation using Swagger/OpenAPI.
*   **Security**: Basic security hardening with `helmet`.
*   **Rate Limiting**: Protects against brute-force attacks.

## 🚀 Getting Started

### 1. Prerequisites

*   Node.js
*   A running database instance (e.g., MySQL).
*   A Stripe account and API keys.

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory and add the following variables. Use `.env.example` as a template.

```env
# .env.example

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1d"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
```

### 4. Database Setup

Run the Prisma migrations to set up your database schema.

```bash
# Apply migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### 5. Running the Server

```bash
# Development mode (with hot-reloading)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000/api`.

## 📖 API Documentation

Once the server is running, you can access the interactive Swagger UI documentation at:

**http://localhost:5000/api-docs**

This documentation provides detailed information on all available endpoints, their parameters, and expected responses.