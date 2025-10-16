# E-commerce Client

This is the frontend application for the e-commerce platform, built with React and Vite. It provides a modern, responsive user interface for customers to shop for products.

## ✨ Features

*   Browse and search for products.
*   User registration and login.
*   Shopping cart functionality.
*   Secure checkout process with Stripe.
*   Responsive design for desktop and mobile.

## 🚀 Getting Started

### 1. Prerequisites

*   Node.js
*   The [backend server](../server) must be running.

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the `client` directory and add the URL for the backend API.

```env
# .env.local.example

VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Running the Client

```bash
# Start the development server
npm run dev
```

The application will be available at **http://localhost:5173**.

---

*This is a template. Please update it to reflect the actual technologies and setup of your client application.*
