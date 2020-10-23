import React from 'react';
import ReactDOM from 'react-dom';
import MiniCart from '.';

describe('<MiniCart />', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MiniCart />, div);
  });
});
