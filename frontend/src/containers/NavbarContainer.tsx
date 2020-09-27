import { connect } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { RootState } from '../redux/rootReducer';

const mapStateToProps = ({ UI }: RootState) => ({
  categories: UI.categories,
});

export default connect(mapStateToProps)(Navbar);
