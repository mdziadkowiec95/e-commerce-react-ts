import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsCollectionMap } from "../../common/types/product";

export interface ProductsState {
	isLoading: boolean;
	items: any[];
}

const initialState = {
	isLoading: false,
	items: [],
};


const productsSlice = createSlice({
	name: 'Products',
	initialState,
	reducers: {
		fetchProductsBegin: (state: ProductsState) => {
			state.isLoading = true;
		},
		fetchProductsSuccess: (state: ProductsState, { payload }: PayloadAction<ProductsCollectionMap>) => {
			console.log(payload);
			state.items = payload.items;
			state.isLoading = true;
		},
		fetchProductsError: (state: ProductsState) => {
			state.isLoading = false;
		},
	}
});

// Export actions
export const ProductsActions = productsSlice.actions;
// Export reducer
export default productsSlice.reducer;
