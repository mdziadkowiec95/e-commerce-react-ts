import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import { RootState } from '../redux/rootReducer';

const mapStateToProps = ({ UI }: RootState) => ({
  categories: UI.categories,
});

export default connect(mapStateToProps)(RegistrationForm);
