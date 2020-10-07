import { connect } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { RootState } from '../redux/rootReducer';

const mapStateToProps = ({ UI, user }: RootState) => ({
  categories: UI.categories,
  user: {
    isAuth: user.isAuth,
    isLoading: user.isLoading,
    user: user.user,
  },
});

export default connect(mapStateToProps)(Navbar);
