import { createSlice } from '@reduxjs/toolkit';
import { Product } from 'common/types/product';
import { fetchProducts } from './products.thunks';
import { ContentfulError } from 'common/types';

export interface ProductsState {
  isLoading: boolean;
  items: Product[];
  error: ContentfulError | null;
}

const initialState: ProductsState = {
  isLoading: false,
  items: [],
  error: null
};

const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending,  (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled,  (state, { payload }) => {
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected,  (state, { payload = null }) => {
        state.isLoading = false;
        state.error = payload;
      })
  }
});

// Export actions
export const ProductsActions = productsSlice.actions;
// Export reducer
export default productsSlice.reducer;
