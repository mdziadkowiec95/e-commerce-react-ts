import { connect } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { RootState } from '../redux/rootReducer';

const mapStateToProps = ({ UI, user }: RootState) => ({
  categories: UI.categories,
  user: {
    isLoading: user.isLoading,
    isAuth: user.isAuth,
  },
});

export default connect(mapStateToProps)(Navbar);
