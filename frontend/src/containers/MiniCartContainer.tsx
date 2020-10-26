import React from 'react';
import { useSelector } from 'react-redux';
import MiniCart from 'components/MiniCart/MiniCart';
import { RootState } from 'redux/rootReducer';

const MiniCartContainer = () => {
  const state = useSelector(({ cart, user }: RootState) => ({
    cart,
    user: {
      isAuth: user.isAuth,
      isLoading: user.isLoading,
      user: user.user,
    },
  }));

  return <MiniCart cart={state.cart} user={state.user} />;
};

export default MiniCartContainer;
