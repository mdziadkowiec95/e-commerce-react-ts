import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavCategories } from 'common/types';

export interface UICategoriesState {
  isLoading: boolean;
  data: NavCategories;
  error: any;
}

interface UIState {
  categories: UICategoriesState;
}

const initialState: UIState = {
  categories: {
    isLoading: false,
    data: {},
    error: null
  }
};

const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    fetchCategoriesBegin: ({ categories }) => {
      categories.isLoading = true;
    },
    fetchCategoriesSuccess: ({ categories }, { payload }: PayloadAction<NavCategories>) => {
      categories.isLoading = false;
      categories.data = payload;
    },
    fetchCategoriesError: ({ categories }, { payload }: PayloadAction<any>) => {
      categories.isLoading = false;
      categories.error = payload;
    }
  }
});

// Export actions
export const UIActions = uiSlice.actions;
// Export reducer
export default uiSlice.reducer;
