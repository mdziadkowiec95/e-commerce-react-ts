import React from 'react';
import ReactDOM from 'react-dom';
import { CartState } from 'redux/Cart/cart.reducer';
import MiniCart from './MiniCart';

const cartMock: CartState = {
  products: [],
  isLoading: false,
};

const userMock = {
  isAuth: false,
  isLoading: true,
  user: null,
};

describe('<MiniCart />', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MiniCart cart={cartMock} user={userMock} />, div);
  });
});
