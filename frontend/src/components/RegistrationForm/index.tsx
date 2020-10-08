import React from 'react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField, { TextFieldType } from '../TextField';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const RegistrationFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too short.')
    .max(30, 'First name is too long.')
    .required('First name is required.'),
  lastName: Yup.string()
    .min(2, 'Last name is too short.')
    .max(50, 'Last name is too long.')
    .required('Last name is required.'),
  email: Yup.string().email('Email is invalid.').required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters long.')
    .required('Password is required.'),
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref('password'), undefined],
      'Passwords must be exactly the same.'
    )
    .required('Password confirmation is required.'),
});

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface Props {
  registerUser: (
    userData: RegistrationFormValues,
    onSuccessCb: () => void
  ) => Promise<void>;
}

const RegistrationForm = ({ registerUser }: Props) => {
  const history = useHistory();

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: RegistrationFormSchema,
    onSubmit: (values: RegistrationFormValues) => {
      registerUser(values, () => {
        history.push('/');
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="registerFirstName"
        name="firstName"
        label="First name"
        value={formik.values.firstName}
        error={formik.errors.firstName}
        touched={formik.touched.firstName}
        leftIcon={faUser}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Enter your first name"
      />

      <TextField
        id="registerLastName"
        name="lastName"
        label="Last name"
        value={formik.values.lastName}
        error={formik.errors.lastName}
        touched={formik.touched.lastName}
        leftIcon={faUser}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Enter your last name"
      />

      <TextField
        id="registerEmail"
        name="email"
        label="Email"
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
        leftIcon={faEnvelope}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Enter your email"
      />

      <TextField
        id="registerPassword"
        name="password"
        label="Password"
        type={TextFieldType.Password}
        value={formik.values.password}
        error={formik.errors.password}
        touched={formik.touched.password}
        leftIcon={faLock}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Enter your password"
      />

      <TextField
        id="registerPasswordConfirm"
        name="passwordConfirm"
        label="Password confirmation"
        type={TextFieldType.Password}
        value={formik.values.passwordConfirm}
        error={formik.errors.passwordConfirm}
        touched={formik.touched.passwordConfirm}
        leftIcon={faLock}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Confirm your password"
      />

      <div className="control">
        <button type="submit" className="button is-link">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
