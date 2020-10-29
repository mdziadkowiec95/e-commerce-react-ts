import { connect } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';
import * as fromCart from 'redux/Cart/cart.selectors';

const mapStateToProps = (state: RootState) => ({
  categories: state.UI.categories,
  user: {
    isAuth: state.user.isAuth,
    isLoading: state.user.isLoading,
    user: state.user.user,
  },
  cart: {
    productsTotalCount: fromCart.getProductsTotalQuantity(state),
  },
});

const mapDispatchToProps = {
  logoutUser: UserThunks.logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
