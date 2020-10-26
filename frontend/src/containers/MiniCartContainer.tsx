import React from 'react';
import { useSelector } from 'react-redux';
import MiniCart, { MiniCartButton } from 'components/MiniCart/MiniCart';
import { RootState } from 'redux/rootReducer';
import Popover from 'common/components/Popover/Popover';
import { getTotalProductsCount } from 'common/helpers/cart';

const MiniCartContainer = () => {
  const state = useSelector(({ cart, user }: RootState) => ({
    cart,
    user: {
      isAuth: user.isAuth,
      isLoading: user.isLoading,
      user: user.user,
    },
  }));

  return (
    <Popover
      alignRight
      buttonComponent={MiniCartButton}
      buttonProps={{
        productsInCart: getTotalProductsCount(state.cart.products),
      }}
      mouseDelay={200}
    >
      <MiniCart cart={state.cart} user={state.user} />
    </Popover>
  );
};

export default MiniCartContainer;
