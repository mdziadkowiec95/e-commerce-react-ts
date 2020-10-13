import { render } from '@testing-library/react';
import React from 'react';
import UserAvatar from './UserAvatar';

describe('<UserAvatar />', () => {
  test('should NOT render when no user data is provided', () => {
    const { container } = render(<UserAvatar />);
    expect(container.innerHTML).toBeFalsy();
  });

  test('should NOT render when first name is not provided', () => {
    const { container } = render(<UserAvatar lastName="Tyson" />);
    expect(container.innerHTML).toBeFalsy();
  });

  test('should NOT render when first name is not provided', () => {
    const { container } = render(<UserAvatar firstName="Mike" />);
    expect(container.innerHTML).toBeFalsy();
  });

  test('should render user initials when both first and last name are provided', () => {
    const { getByText } = render(
      <UserAvatar firstName="Mike" lastName="Tyson" />
    );
    expect(getByText('MT')).toBeTruthy();
  });
});
