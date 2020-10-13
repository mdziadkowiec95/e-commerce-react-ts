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
			const existingProductIndex = state.products.findIndex((product: ProductInCart) => product.id === payload.id);

			if (existingProductIndex === -1) {
				state.products.push({ ...payload, quantity: 1 });
			} else {
				state.products[existingProductIndex].quantity += 1;
			}
		}
	}
});

// Export actions
export const CartActions = cartSlice.actions;
// Export reducer
export default cartSlice.reducer;
