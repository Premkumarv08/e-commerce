import axios from "axios";
import type { Product, AuthResponse, LoginCredentials, SignupCredentials, CartItem } from "@/interfaces";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // Dynamically import the store to avoid circular dependencies.
    const { store } = await import("@/store/store");
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export const productAPI = {
  getProducts: <T = Product[]>(): Promise<T> => api.get("/products"),
};

export const authAPI = {
  signup: <T = AuthResponse>(credentials: SignupCredentials): Promise<T> => api.post("/auth/signup", credentials),
  login: <T = AuthResponse>(credentials: LoginCredentials): Promise<T> => api.post("/auth/login", credentials),
};

export const paymentAPI = {
  createPaymentIntent: (items: CartItem[]): Promise<{ clientSecret: string }> =>
    api.post("/payments/create-payment-intent", { items }),
};

export default api;
