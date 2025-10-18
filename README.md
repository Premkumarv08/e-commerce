# E-commerce Platform

This is a full-stack e-commerce application featuring a complete shopping experience, from browsing products to secure payment processing. The project is split into a `client` (frontend) and a `server` (backend).

## ✨ Features

*   **User Authentication**: Secure user registration and login using JWT.
*   **Product Catalog**: Browse and view a list of all available products.
*   **Shopping Cart**: (Assumed Feature) Users can add products to a cart.
*   **Secure Payments**: Integration with Stripe for robust and secure payment processing.
*   **API Documentation**: Interactive API documentation powered by Swagger.

## 🛠️ Tech Stack

*   **Backend**: Node.js, Express.js, Prisma (ORM), Stripe API
*   **Frontend**: React with Vite
*   **Database**: MySQL, managed by Prisma

## 📂 Project Structure

```
e-commerce/
├── client/         # Frontend application
├── server/         # Backend Express.js API
└── README.md       # You are here
```

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   A database (e.g., MySQL)
*   A Stripe account for payment processing.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd e-commerce
    ```

2.  **Setup the Server:**
    Navigate to the server directory and follow the instructions in its README.
    ```bash
    cd server
    # Follow server/README.md
    npm run dev
    ```

3.  **Setup the Client:**
    In a new terminal, navigate to the client directory and follow its README.
    ```bash
    cd client
    # Follow client/README.md
    npm run dev
    ```

The server will be running on `https://e-commerce-production-dd7f.up.railway.app/`, and the client will be on `https://e-commerce-seven-cyan-54.vercel.app`.

### Testing

For payment processing, you can use the test card numbers provided by Stripe.

*   **Stripe Test Cards**: https://docs.stripe.com/testing

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.
