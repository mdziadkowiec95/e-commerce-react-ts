import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as UIThunks from 'redux/UI/UI.thunks';
import * as UserThunks from 'redux/User/user.thunks';
import store from 'redux/store';
import NotificationBarContainer from 'containers/NotificationBarContainer';
import RegistrationView from 'views/Registration';
import Products from 'views/Products';
import ProductDetails from 'views/ProductDetails/ProductDetails';
import Container from 'common/components/Container/Container';
import { setAuthTokenHeader } from 'helpers/setAuthTokenHeader';
import cn from 'classnames';

import 'scss/app.scss';

import { Device } from 'common/helpers';
import WithNavigation from 'common/hoc/WithNavigation';
import Home from 'views/Home/Home';
import Cart from 'views/Cart/Cart';
import { RouterView } from 'common/types';

setAuthTokenHeader(localStorage.getItem('authToken'));

const App = () => {
  useEffect(() => {
    store.dispatch(UserThunks.authenticateUser());
    store.dispatch(UIThunks.fetchCategories());
  }, []);

  return (
    <div
      className={cn({
        'is-touch-device': Device.isTouchDevice(),
      })}
    >
      <Router>
        <NotificationBarContainer />

        <Container>
          <Switch>
            <Route exact path="/">
              <WithNavigation component={Home} view={RouterView.Home} />
            </Route>
            <Route exact path="/register">
              <WithNavigation
                component={RegistrationView}
                view={RouterView.Register}
              />
            </Route>
            <Route exact path="/products/:rootCategory?/:subCategory?">
              <WithNavigation component={Products} view={RouterView.Products} />
            </Route>
            <Route exact path="/product/:productId">
              <WithNavigation
                component={ProductDetails}
                view={RouterView.ProductDetails}
              />
            </Route>
            <Route exact path="/cart">
              <WithNavigation component={Cart} view={RouterView.Cart} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
