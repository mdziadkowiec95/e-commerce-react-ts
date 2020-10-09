import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import RegistrationForm, {
  RegistrationFormValues,
} from '../components/RegistrationForm';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';

interface Props {
  registerUser: (
    userData: RegistrationFormValues,
    onSuccessCb: () => void
  ) => Promise<void>;
}

const RegistrationContainer = ({ registerUser }: Props) => {
  const history = useHistory();

  const handleFormSubmit = (values: RegistrationFormValues): void => {
    registerUser(values, (): void => {
      history.push('/');
    });
  };

  return <RegistrationForm onSubmit={handleFormSubmit} />;
};

const mapStateToProps = ({ UI }: RootState) => ({
  categories: UI.categories,
});

const mapDistpatchToProps = {
  registerUser: UserThunks.registerUser,
};

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(RegistrationContainer);
