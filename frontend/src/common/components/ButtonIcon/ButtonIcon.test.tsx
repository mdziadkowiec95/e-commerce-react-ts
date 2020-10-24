import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import ButtonIcon from '.';
import { Colors } from '../../types/bulma';

describe('<ButtonIcon />', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonIcon />, div);
  });

  test('should render children properly', () => {
    const { getByText } = render(
      <ButtonIcon>Test text as children</ButtonIcon>
    );

    expect(getByText('Test text as children')).toBeTruthy();
  });

  test('should render primary variant by default', () => {
    const { container } = render(<ButtonIcon />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveClass('button', 'is-primary');
  });

  test('should render variant prop correctly', () => {
    const { container } = render(<ButtonIcon variant={Colors.Danger} />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveClass('button', 'is-danger');
  });

  test('should render right arrow by default', () => {
    const { container } = render(<ButtonIcon />);
    const svgIcon = container.querySelector('button svg') as HTMLElement;

    expect(svgIcon).toHaveClass('fa-long-arrow-alt-right');
  });

  test('should render icon prop correctly', () => {
    const { container } = render(<ButtonIcon icon={faCartPlus} />);
    const svgIcon = container.querySelector('button svg') as HTMLElement;

    expect(svgIcon).toHaveAttribute('data-icon', faCartPlus.iconName);
  });

  test('should NOT render full width button by default', () => {
    const { container } = render(<ButtonIcon />);
    const btn = container.querySelector('button') as HTMLButtonElement;

    expect(btn).not.toHaveClass('is-fullwidth');
  });

  test('should render full width button when isFullwidth prop is provided', () => {
    const { container } = render(<ButtonIcon isFullwidth />);
    const btn = container.querySelector('button') as HTMLButtonElement;

    expect(btn).toHaveClass('is-fullwidth');
  });

  test('should emit event on click', async () => {
    const onClick = jest.fn();
    const { container } = render(<ButtonIcon isFullwidth onClick={onClick} />);
    const btn = container.querySelector('button') as HTMLButtonElement;

    await wait(() => {
      fireEvent.click(btn);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(expect.any(Object));
  });
});
