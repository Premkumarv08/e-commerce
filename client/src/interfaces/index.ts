export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  description: string;
  category: string;
  rating: number;
  ratingCount: number;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type SignupCredentials = Omit<User, 'id' | 'name'> & {
  name: string;
  password: string;
};

export interface CartItem extends Product {
  quantity: number;
}