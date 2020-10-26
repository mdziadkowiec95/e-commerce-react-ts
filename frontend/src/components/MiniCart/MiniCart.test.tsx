import React from 'react';
import { CartState } from 'redux/Cart/cart.reducer';
import { ReducerName } from 'redux/rootReducer';
import { renderWithMockStore } from '../../../tests/helpers/mockStore';
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
    renderWithMockStore(<MiniCart cart={cartMock} user={userMock} />, {
      reducer: ReducerName.Cart,
      initialState: {
        isLoading: false,
        products: [],
      },
    });
  });
});
