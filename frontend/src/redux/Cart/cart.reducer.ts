import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInCart } from "../../common/types/product";

export interface CartState {
  isLoading: boolean;
  products: ProductInCart[];
}

const initialState: CartState = {
  isLoading: false,
  products: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addProductToCart: (state, { payload }: PayloadAction<ProductInCart>) => {
      const existingProductIndex: number = state.products.findIndex((product: ProductInCart) => product.id === payload.id);

      if (existingProductIndex === -1) {
        state.products.push({ ...payload, quantity: 1 });
      } else {
        state.products[existingProductIndex].quantity += 1;
      }
    },
    loadPersistedCart: (state, { payload }: PayloadAction<ProductInCart[]>) => {
      state.products = payload;
    },
    loadPersistedCartForAuthUserBegin: state => {
      state.isLoading = true;
    },
    loadPersistedCartForAuthUserSuccess: (state, { payload }: PayloadAction<ProductInCart[]>) => {
      payload.forEach((dbProduct: ProductInCart) => {
        const existingProductIndex: number = state.products.findIndex((cartProduct: ProductInCart) => cartProduct.id === dbProduct.id);

        if (existingProductIndex === -1) {
          state.products.push(dbProduct);
        } else {
          state.products[existingProductIndex].quantity += dbProduct.quantity;
        }
      });
    },
    clearCart: state => {
      state.products = [];
    }
  },
});

// Export actions
export const CartActions = cartSlice.actions;
// Export reducer
export default cartSlice.reducer;
