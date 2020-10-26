import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, wait } from '@testing-library/react';
import SignInForm from 'components/SignInForm/SignInForm';
import { changeInputValue } from '../../../tests/helpers/fireEvent';

describe('<SignInForm />', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignInForm onSubmit={() => {}} />, div);
  });
  test('should submit correct values', async () => {
    const onSubmitFn = jest.fn();

    const { getByLabelText, container } = render(
      <SignInForm onSubmit={onSubmitFn} />
    );

    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      changeInputValue(email, 'test@test.pl');
      changeInputValue(password, '123123123');
      fireEvent.click(submitBtn);
    });

    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn).toHaveBeenCalledWith({
      email: 'test@test.pl',
      password: '123123123',
    });
  });

  test('should should proper message when email is empty', async () => {
    const { getByLabelText, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const email = getByLabelText('Email');

    await wait(() => {
      changeInputValue(email, '');
      fireEvent.blur(email);
    });

    expect(queryByText('Email is required.')).toBeTruthy();
  });

  test('should should proper message when email is not valid', async () => {
    const { getByLabelText, queryByText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const email = getByLabelText('Email');

    await wait(() => {
      changeInputValue(email, 'testtest.pl');
      fireEvent.blur(email);
    });

    expect(queryByText('Email is invalid.')).toBeTruthy();
  });

  test('should should proper message when password is empty', async () => {
    const { queryByText, getByLabelText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const password = getByLabelText('Password');

    await wait(() => {
      fireEvent.focus(password);
      fireEvent.blur(password);
    });

    expect(queryByText('Password is required.')).toBeTruthy();
  });

  test('should should proper message when password is too short', async () => {
    const { queryByText, getByLabelText } = render(
      <SignInForm onSubmit={() => {}} />
    );

    const password = getByLabelText('Password');

    await wait(() => {
      changeInputValue(password, '1234567');
      fireEvent.blur(password);
    });

    expect(
      queryByText('Password should be at least 8 characters long.')
    ).toBeTruthy();
  });

  test('should block submitting when email is not vaild', async () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <SignInForm onSubmit={onSubmit} />
    );

    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      changeInputValue(email, 'badEmailTest.pl');
      changeInputValue(password, '12345678');
      fireEvent.click(submitBtn);
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should block submitting when password is not vaild', async () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <SignInForm onSubmit={onSubmit} />
    );

    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      changeInputValue(email, 'validEmail@test.pl');
      changeInputValue(password, '1234567');
      fireEvent.click(submitBtn);
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
