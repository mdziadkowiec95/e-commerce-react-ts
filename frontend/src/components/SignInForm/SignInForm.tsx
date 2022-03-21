import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import TextField, {
  TextFieldType,
} from 'common/components/TextField/TextField';
import styles from './SignInForm.module.scss';

export interface SignInFormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: SignInFormValues) => void;
}

const SignInFormSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid.').required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters long.')
    .required('Password is required.'),
});

const SignInForm = ({ onSubmit }: Props) => {
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInFormSchema,
    onSubmit: (values: SignInFormValues) => onSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.wrap}>
      <TextField
        id="signInEmail"
        name="email"
        label="Email"
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
        leftIcon={faEnvelope}
        onChangeFn={formik.handleChange}
        onFocusFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        placeholder="Your email"
      />

      <TextField
        id="signInPassword"
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
        placeholder="Your password"
      />

      <button
        type="submit"
        className="button is-primary is-rounded is-fullwidth mb-2"
      >
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
