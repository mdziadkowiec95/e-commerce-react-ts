import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, wait } from '@testing-library/react';
import SignInForm from '.';

describe('<SignInForm />', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignInForm onSubmit={() => {}} />, div);
  });
  test('should submit correct values', async () => {
    const onSubmitFn = jest.fn();

    const { container } = render(<SignInForm onSubmit={onSubmitFn} />);

    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const password = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      fireEvent.change(email, {
        target: {
          value: 'test@test.pl',
        },
      });
    });

    await wait(() => {
      fireEvent.change(password, {
        target: {
          value: '123123123',
        },
      });
    });

    await wait(() => {
      fireEvent.click(submitBtn);
    });

    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn).toHaveBeenCalledWith({
      email: 'test@test.pl',
      password: '123123123',
    });
  });

  test('should should proper message when email is empty', async () => {
    const { container, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.change(email, {
        target: {
          value: '',
        },
      });

      fireEvent.blur(email);
    });

    expect(queryByText('Email is required.')).toBeTruthy();
  });

  test('should should proper message when email is not valid', async () => {
    const { container, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const email = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.change(email, {
        target: {
          value: 'testtest.pl',
        },
      });

      fireEvent.blur(email);
    });

    expect(queryByText('Email is invalid.')).toBeTruthy();
  });

  test('should should proper message when password is empty', async () => {
    const { container, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const password = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.change(password, {
        target: {
          value: '',
        },
      });

      fireEvent.blur(password);
    });

    expect(queryByText('Password is required.')).toBeTruthy();
  });

  test('should should proper message when password is too short', async () => {
    const { container, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const password = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.change(password, {
        target: {
          value: '1234567',
        },
      });

      fireEvent.blur(password);
    });

    expect(
      queryByText('Password should be at least 8 characters long.')
    ).toBeTruthy();
  });
});
