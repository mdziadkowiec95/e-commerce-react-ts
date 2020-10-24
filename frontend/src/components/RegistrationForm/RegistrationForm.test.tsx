import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, wait } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import { changeInputValue } from '../../../tests/helpers/fireEvent';

describe('<RegistrationForm />', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegistrationForm onSubmit={() => {}} />, div);
  });

  test('should submit correct values', async () => {
    const onSubmitFn = jest.fn();

    const { getByLabelText, container } = render(
      <RegistrationForm onSubmit={onSubmitFn} />
    );

    const firstName = getByLabelText('First name');
    const lastName = getByLabelText('Last name');
    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const passwordConfirmation = getByLabelText('Password confirmation');
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      changeInputValue(firstName, 'Mike');
      changeInputValue(lastName, 'Tyson');
      changeInputValue(email, 'miketyson@test.pl');
      changeInputValue(password, '12345678');
      changeInputValue(passwordConfirmation, '12345678');

      fireEvent.click(submitBtn);
    });

    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn).toHaveBeenCalledWith({
      firstName: 'Mike',
      lastName: 'Tyson',
      email: 'miketyson@test.pl',
      password: '12345678',
      passwordConfirm: '12345678',
    });
  });

  test('should show proper message when First name is empty', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const firstName = getByLabelText('First name');

    await wait(() => {
      changeInputValue(firstName, '');
      fireEvent.blur(firstName);
    });

    expect(queryByText('First name is required.')).toBeTruthy();
  });

  test('should show proper message when First name is too short', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const firstName = getByLabelText('First name');

    await wait(() => {
      changeInputValue(firstName, 's');
      fireEvent.blur(firstName);
    });

    expect(queryByText('First name is too short.')).toBeTruthy();
  });

  test('should show proper message when First name is too long', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const firstName = getByLabelText('First name');

    await wait(() => {
      changeInputValue(firstName, new Array(32).fill(32).join(''));
      fireEvent.blur(firstName);
    });

    expect(queryByText('First name is too long.')).toBeTruthy();
  });

  test('should show proper message when Last name is empty', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const lastName = getByLabelText('Last name');

    await wait(() => {
      changeInputValue(lastName, '');
      fireEvent.blur(lastName);
    });

    expect(queryByText('Last name is required.')).toBeTruthy();
  });

  test('should show proper message when Last name is too short', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const lastName = getByLabelText('Last name');

    await wait(() => {
      changeInputValue(lastName, 's');
      fireEvent.blur(lastName);
    });

    expect(queryByText('Last name is too short.')).toBeTruthy();
  });

  test('should show proper message when Last name is too long', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const lastName = getByLabelText('Last name');

    await wait(() => {
      changeInputValue(lastName, new Array(51).fill('a').join(''));
      fireEvent.blur(lastName);
    });

    expect(queryByText('Last name is too long.')).toBeTruthy();
  });

  test('should should proper message when email is empty', async () => {
    const { getByLabelText, queryByText } = render(
      <RegistrationForm onSubmit={() => {}} />
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
      <RegistrationForm onSubmit={() => {}} />
    );

    const email = getByLabelText('Email');

    await wait(() => {
      changeInputValue(email, 'invalidemail.pl');
      fireEvent.blur(email);
    });

    expect(queryByText('Email is invalid.')).toBeTruthy();
  });

  test('should should proper message when password is empty', async () => {
    const { queryByText, getByLabelText } = render(
      <RegistrationForm onSubmit={() => {}} />
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
      <RegistrationForm onSubmit={() => {}} />
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

  test('should should proper message when password confirmation is empty', async () => {
    const { queryByText, getByLabelText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const passwordConfirmation = getByLabelText('Password confirmation');

    await wait(() => {
      fireEvent.focus(passwordConfirmation);
      fireEvent.blur(passwordConfirmation);
    });

    expect(queryByText('Password confirmation is required.')).toBeTruthy();
  });

  test('should should proper message when passwords are not the same', async () => {
    const { queryByText, getByLabelText } = render(
      <RegistrationForm onSubmit={() => {}} />
    );

    const password = getByLabelText('Password');
    const passwordConfirmation = getByLabelText('Password confirmation');

    await wait(() => {
      changeInputValue(password, '12345678');
      changeInputValue(passwordConfirmation, '01234567891');
      fireEvent.blur(passwordConfirmation);
    });

    expect(queryByText('Passwords must be exactly the same.')).toBeTruthy();
  });

  test('should NOT submit form when there is some invalid field', async () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <RegistrationForm onSubmit={onSubmit} />
    );

    const firstName = getByLabelText('First name');
    const lastName = getByLabelText('Last name');
    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const passwordConfirmation = getByLabelText('Password confirmation');
    const submitBtn = container.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await wait(() => {
      changeInputValue(firstName, 'First name');
      changeInputValue(lastName, 'Last name');
      changeInputValue(email, 'invalidEmail.test');
      changeInputValue(password, '12345678');
      changeInputValue(passwordConfirmation, '12345678');
      fireEvent.click(submitBtn);
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
