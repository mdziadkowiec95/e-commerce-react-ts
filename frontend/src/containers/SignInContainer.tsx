import React from 'react';
import { connect } from 'react-redux';
import SignInForm, { SignInFormValues } from '../components/SignInForm';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';

interface Props {
  signInUser: (email: string, password: string) => void;
}

const SignInContainer = ({ signInUser }: Props) => {
  const handleFormSubmit = ({ email, password }: SignInFormValues) => {
    signInUser(email, password);
  };

  return <SignInForm onSubmit={handleFormSubmit} />;
};

const mapStateToProps = ({ UI, user }: RootState) => ({});

const mapDispatchToProps = {
  signInUser: UserThunks.signInUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
