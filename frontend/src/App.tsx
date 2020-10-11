import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app.scss';
import Products from './views/Products';
import * as UIThunks from './redux/UI/UI.thunks';
import * as UserThunks from './redux/User/user.thunks';
import NavbarContainer from './containers/NavbarContainer';
import RegistrationView from './views/Registration';
import { setAuthTokenHeader } from './helpers/setAuthTokenHeader';
import store from './redux/store';
import NotificationBarContainer from './containers/NotificationBarContainer';
import Container from './components/Container';

setAuthTokenHeader(localStorage.getItem('authToken'));

const App = () => {
  useEffect(() => {
    store.dispatch(UserThunks.authenticateUser());
    store.dispatch(UIThunks.fetchCategories());
  }, []);

  return (
    <div className="App">
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
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
