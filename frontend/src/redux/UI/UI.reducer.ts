import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavCategories } from 'common/types';

export interface UICategoriesState {
  isLoading: boolean;
  data: NavCategories;
  error: any;
}

export enum ActiveMenu {
  Nav = 'nav',
  User = 'user'
}

export interface ActiveMenus {
  nav: boolean;
  user: boolean;
};

interface UIState {
  categories: UICategoriesState;
  activeMenus: ActiveMenus;
}

const initialState: UIState = {
  categories: {
    isLoading: false,
    data: {},
    error: null
  },
  activeMenus: {
    nav: false,
    user: false,
  }
};

// Toggle targeted menu and close other menus if any is open
const handleToggleMenu = (state: UIState, payload: { isActive: boolean, menu: ActiveMenu }) => {
  const toggledMenu = payload.menu;

  for (const menu in state.activeMenus) {
    if (menu === toggledMenu) {
      state.activeMenus[menu] = payload.isActive;
    } else if (payload.isActive) {
      state.activeMenus[menu as keyof ActiveMenus] = false;
    }
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
    },
    toggleNavMenu: (state, { payload }: PayloadAction<{ isActive: boolean, menu: ActiveMenu }>) => {
      handleToggleMenu(state, payload);
    }
  }
});

// Export actions
export const UIActions = uiSlice.actions;
// Export reducer
export default uiSlice.reducer;
