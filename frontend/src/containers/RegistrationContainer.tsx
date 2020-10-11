import React from 'react';
import { useHistory } from 'react-router';
import RegistrationForm, {
  RegistrationFormValues,
} from '../components/RegistrationForm';
import { useAppDispatch } from '../redux/store';
import * as UserThunks from '../redux/User/user.thunks';

const RegistrationContainer = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (values: RegistrationFormValues): void => {
    dispatch(
      UserThunks.registerUser(values, (): void => {
        history.push('/');
      })
    );
  };

  return <RegistrationForm onSubmit={handleFormSubmit} />;
};

export default RegistrationContainer;
