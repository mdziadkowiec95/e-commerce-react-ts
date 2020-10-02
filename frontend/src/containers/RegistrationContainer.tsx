import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';

const mapStateToProps = ({ UI }: RootState) => ({
  categories: UI.categories,
});

const mapDistpatchToProps = {
  registerUser: UserThunks.registerUser,
};

export default connect(mapStateToProps, mapDistpatchToProps)(RegistrationForm);
