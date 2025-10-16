import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer, { AuthState } from "../features/auth/authSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    const { data: authData } = JSON.parse(serializedState);
    return {
      isAuthenticated: !!authData.token,
      user: authData.user,
      token: authData.token,
      status: "idle" as const,
      error: null,
    };
  } catch (err) {
    return undefined;
  }
};

const preloadedState: Partial<RootState> = {}; // Now RootState is defined
const authState = loadAuthState();
if (authState) {
  preloadedState.auth = authState;
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
