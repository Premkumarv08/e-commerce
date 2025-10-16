import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "@/interfaces";
import { productAPI } from "@/services/api";
import { RootState } from "@/store/store";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await productAPI.getProducts<{ data: Product[] }>();
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;

const selectProducts = (state: RootState) => state.products.items;
const selectSearchTerm = (state: RootState) => state.products.searchTerm;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm],
  (products, searchTerm) => products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

export default productsSlice.reducer;
