import React from 'react';
import { useSelector } from 'react-redux';
import MiniCart from 'components/MiniCart/MiniCart';
import { RootState } from '../redux/rootReducer';
import { useAppDispatch } from '../redux/store';

const MiniCartContainer = () => {
  const dispatch = useAppDispatch();
  const { cart, user } = useSelector(({ cart, user }: RootState) => ({
    cart,
    user: {
      isAuth: user.isAuth,
      isLoading: user.isLoading,
      user: user.user,
    },
  }));

  return <MiniCart cart={cart} user={user} />;
};

export default MiniCartContainer;
