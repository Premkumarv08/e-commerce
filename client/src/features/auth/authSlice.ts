import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "@/services/api";
import { User, LoginCredentials, SignupCredentials, AuthResponse } from "@/interfaces";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk<AuthResponse, SignupCredentials>(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.signup<{ data: AuthResponse }>(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login<{ data: AuthResponse }>(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      try {
        localStorage.removeItem("authState");
      } catch (e) {
        console.error("Could not remove auth state from localStorage", e);
      }
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.status = "loading";
      state.error = null;
    };
    const handleFulfilled = (state: AuthState, action: PayloadAction<AuthResponse>) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      try {
        localStorage.setItem("authState", JSON.stringify(action.payload));
      } catch (e) {
        console.error("Could not save auth state to localStorage", e);
      }
      state.user = action.payload.user;
      state.token = action.payload.token;
    };
    const handleRejected = (state: AuthState, action: any) => {
      state.status = "failed";
      state.error = action.payload || "An unknown error occurred";
    };

    builder
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, handleFulfilled)
      .addCase(signup.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
