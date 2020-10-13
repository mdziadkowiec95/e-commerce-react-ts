import { render } from '@testing-library/react';
import React from 'react';
import Container from '.';

describe('<Container /> tests', () => {
  test('should render without crashes', () => {
    render(<Container />);
  });

  test('should render children correctly', () => {
    const { getByTestId } = render(
      <Container>
        <button data-testid="Container_Test_button">
          <span data-testid="Container_Test__span"></span>
        </button>
      </Container>
    );

    expect(getByTestId('Container_Test_button')).toBeTruthy();
    expect(getByTestId('Container_Test__span')).toBeTruthy();
  });

  test('should have proper classNames', () => {
    const { container } = render(<Container />);
    const containerEl = container.querySelector('div') as HTMLDivElement;

    expect(containerEl).toHaveClass('container', 'px-5');
  });
});
