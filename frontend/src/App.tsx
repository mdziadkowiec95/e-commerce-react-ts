import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './scss/app.scss';
import Products from './views/Products';
import * as UIThunks from './redux/UI/UI.thunks';
import NavbarContainer from './containers/NavbarContainer';
import RegistrationView from './views/Registration';

interface AppProps {
  UI: any;
  fetchCategories: Function;
}

function App({ fetchCategories }: AppProps) {
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="App">
      <Router>
        <NavbarContainer />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return <h1>Home</h1>;
              }}
            />
            <Route exact path="/register" component={RegistrationView} />
            <Route
              exact
              path="/products/:rootCategory?/:subCategory?"
              component={Products}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    UI: state.UI,
  };
};

const mapDispatchToProps = {
  fetchCategories: UIThunks.fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
