import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { RootState } from 'redux/rootReducer';
import * as UserThunks from 'redux/User/user.thunks';
import * as fromCart from 'redux/Cart/cart.selectors';
import { ActiveMenu, UIActions } from 'redux/UI/UI.reducer';
import { useAppDispatch } from 'redux/store';

const NavbarContainer = () => {
  const dispatch = useAppDispatch();
  const state = useSelector(
    (state: RootState) => ({
      categories: state.UI.categories,
      activeMenus: state.UI.activeMenus,
      user: {
        isAuth: state.user.isAuth,
        isLoading: state.user.isLoading,
        user: state.user.user,
      },
      cart: {
        productsTotalCount: fromCart.getProductsTotalQuantity(state),
      },
    }),
    shallowEqual
  );

  const { categories, activeMenus, user, cart } = state;

  const handleUserLogout = () => {
    dispatch(UserThunks.logoutUser());
  };

  const handleToggleNavMenu = (isActive: boolean) => {
    dispatch(UIActions.toggleNavMenu({ isActive, menu: ActiveMenu.Nav }));
  };

  const handleToggleUserMenu = (isActive: boolean) => {
    dispatch(UIActions.toggleNavMenu({ isActive, menu: ActiveMenu.User }));
  };

  return (
    <Navbar
      categories={categories}
      activeMenus={activeMenus}
      user={user}
      cart={cart}
      logoutUser={handleUserLogout}
      toggleNavMenu={handleToggleNavMenu}
      toggleUserMenu={handleToggleUserMenu}
    />
  );
};

export default NavbarContainer;
