import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as UIThunks from 'redux/UI/UI.thunks';
import * as UserThunks from 'redux/User/user.thunks';
import store from 'redux/store';
import NavbarContainer from 'containers/NavbarContainer';
import NotificationBarContainer from 'containers/NotificationBarContainer';
import RegistrationView from 'views/Registration';
import Products from 'views/Products';
import ProductDetails from 'views/ProductDetails/ProductDetails';
import Container from 'common/components/Container/Container';
import { setAuthTokenHeader } from 'helpers/setAuthTokenHeader';

import 'scss/app.scss';

setAuthTokenHeader(localStorage.getItem('authToken'));

const App = () => {
  useEffect(() => {
    store.dispatch(UserThunks.authenticateUser());
    store.dispatch(UIThunks.fetchCategories());
  }, []);

  return (
    <>
      <Router>
        <NotificationBarContainer />
        <NavbarContainer />

        <Container>
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
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
