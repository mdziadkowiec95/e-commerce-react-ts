import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import TextField, {
  TextFieldType,
} from 'common/components/TextField/TextField';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// Helper component to handle dumb component state
const TextFieldWrapper = (props: any) => {
  const [fieldValue, setFieldValue] = useState('');

  const changeHandler = (
    e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(e.target.value);
  };

  return (
    <TextField
      {...props}
      onChangeFn={changeHandler}
      onFocusFn={changeHandler}
      onBlurFn={changeHandler}
      value={fieldValue}
    />
  );
};
describe('<TextField />', () => {
  test('should update value on focus correctly', async () => {
    const { container } = render(
      <TextFieldWrapper
        id="registerFirstName"
        name="firstName"
        label="First name"
        error={undefined}
        touched={false}
        leftIcon={undefined}
        placeholder="Enter your first name"
      />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.change(name, {
        target: {
          value: 'testingNameFieldChange',
        },
      });
    });

    expect(name.value).toEqual('testingNameFieldChange');
  });

  test('should update value on focus correctly', async () => {
    const { container } = render(
      <TextFieldWrapper
        id="registerFirstName"
        name="firstName"
        label="First name"
        error={undefined}
        touched={false}
        leftIcon={undefined}
        placeholder="Enter your first name"
      />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.focus(name, {
        target: {
          value: 'testingNameFieldFocus',
        },
      });
    });

    expect(name.value).toEqual('testingNameFieldFocus');
  });

  test('should update value on blur correctly', async () => {
    const { container } = render(
      <TextFieldWrapper
        id="registerFirstName"
        name="firstName"
        label="First name"
        error={undefined}
        touched={false}
        leftIcon={undefined}
        placeholder="Enter your first name"
      />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    await wait(() => {
      fireEvent.focus(name, {
        target: {
          value: 'testingNameFieldBlur',
        },
      });
    });

    expect(name.value).toEqual('testingNameFieldBlur');
  });

  test('should render ID attribute correctly', () => {
    const { container } = render(
      <TextFieldWrapper id="registerFirstNameId" name="firstName" />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    expect(name.id).toEqual('registerFirstNameId');
  });

  test('should render ID attribute correctly', () => {
    const { container } = render(
      <TextFieldWrapper id="registerFirstNameId" name="firstName" />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    expect(name.id).toEqual('registerFirstNameId');
  });

  test('should render placeholder attribute correctly', () => {
    const { container } = render(
      <TextFieldWrapper placeholder="Testing placeholder" name="firstName" />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    expect(name.getAttribute('placeholder')).toEqual('Testing placeholder');
  });

  test('should render default type if not provided', () => {
    const { container } = render(
      <TextFieldWrapper id="registerFirstNameId" name="firstName" />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    expect(name.type).toEqual('text');
  });

  test('should set provided type corretly', () => {
    const { container } = render(
      <TextFieldWrapper
        id="registerFirstNameId"
        name="firstName"
        type={TextFieldType.Password}
      />
    );

    const name = container.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;

    expect(name.type).toEqual('password');
  });

  test('should render label correctly', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper
        id="testIdForLabel"
        label="testLabelText"
        leftIcon={faCheck}
        name="firstName"
      />
    );

    const labelEl = queryByTestId('TextField-label');

    expect(labelEl?.getAttribute('for')).toEqual('testIdForLabel');
    expect(labelEl?.textContent).toEqual('testLabelText');
  });

  test('should render left side icon if provided as prop', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper leftIcon={faCheck} name="firstName" />
    );

    const leftIconWrap = queryByTestId('TextField-leftIcon');
    const leftIcon = leftIconWrap?.querySelector('svg');

    expect(leftIcon?.getAttribute('data-icon')).toEqual('check');
  });

  test('should render success icon if field is touched and there is no error', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper name="firstName" touched={true} error={null} />
    );

    const dangerIcon = queryByTestId('TextField-dangerIcon');
    const successIcon = queryByTestId('TextField-successIcon');

    expect(dangerIcon).toBeFalsy();
    expect(successIcon).toBeTruthy();
  });

  test('should render danger icon if field is touched and there is some error', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper name="firstName" touched={true} error={'Some error'} />
    );

    const dangerIcon = queryByTestId('TextField-dangerIcon');
    const successIcon = queryByTestId('TextField-successIcon');

    expect(dangerIcon).toBeTruthy();
    expect(successIcon).toBeFalsy();
  });

  test('should NOT render any icon if field has not been touched yet', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper name="firstName" touched={false} error={'Some error'} />
    );

    const dangerIcon = queryByTestId('TextField-dangerIcon');
    const successIcon = queryByTestId('TextField-successIcon');

    expect(dangerIcon).toBeFalsy();
    expect(successIcon).toBeFalsy();
  });

  test('should render success message if field has been touched and there is no error', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper name="firstName" touched={true} error={null} />
    );

    const errorText = queryByTestId('TextField-dangerMessage');
    const successText = queryByTestId('TextField-successMessage');

    expect(errorText).toBeFalsy();
    expect(successText).toBeFalsy();
  });

  test('should render danger message if field has been touched and there is some error', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper
        name="firstName"
        touched={true}
        error={'Some error text'}
      />
    );

    const errorText = queryByTestId('TextField-dangerMessage');
    const successText = queryByTestId('TextField-successMessage');

    expect(errorText).toBeTruthy();
    expect(successText).toBeFalsy();
  });

  test('should NOT render any message if field has not been touched yet', () => {
    const { queryByTestId } = render(
      <TextFieldWrapper
        name="firstName"
        touched={false}
        error={'Some error text'}
      />
    );

    const errorText = queryByTestId('TextField-dangerMessage');
    const successText = queryByTestId('TextField-successMessage');

    expect(errorText).toBeFalsy();
    expect(successText).toBeFalsy();
  });

  test('should render field of type "text" by default', () => {
    const { getByLabelText } = render(
      <TextFieldWrapper id="password" label="Password" name="password" />
    );

    expect(getByLabelText('Password').getAttribute('type')).toEqual('text');
  });

  test('should render field based on "type" prop correctly', () => {
    const { getByLabelText } = render(
      <TextFieldWrapper
        id="password"
        label="Password"
        name="password"
        type={TextFieldType.Password}
      />
    );

    expect(getByLabelText('Password').getAttribute('type')).toEqual('password');
  });
});
