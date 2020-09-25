import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app.scss';
import Products from './views/Products';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import { getCategoriesBegin } from './redux/UI/UI.actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface AppProps {
  UI: any;
  getCategories: Function;
}

function App({ UI, getCategories }: AppProps) {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Test server communication
  // axios.get('/api').then((res) => {
  //   console.log('Welcome to your server :D', res.data.msg);
  // });

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <h1>Home</h1>;
            }}
          />
          <Route
            exact
            path="/products/:rootCategory?/:subCategory?"
            component={Products}
          />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    UI: state.UI,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesBegin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
