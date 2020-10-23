import { connect } from 'react-redux';
import MiniCart from '../components/MiniCart';
import { RootState } from '../redux/rootReducer';
import * as UserThunks from '../redux/User/user.thunks';

const mapStateToProps = ({ cart, user }: RootState) => ({
  cart,
  user: {
    isAuth: user.isAuth,
    isLoading: user.isLoading,
    user: user.user,
  },
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
