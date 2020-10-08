import { connect } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';

const mapStateToProps = ({ UI, user }: RootState) => ({
  categories: UI.categories,
  user: {
    isAuth: user.isAuth,
    isLoading: user.isLoading,
    user: user.user,
  },
});

const mapDispatchToProps = {
  logoutUser: UserThunks.logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
