import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/app.scss';
import Products from './views/Products';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';

function App() {
  // Test server communication
  axios.get('/api').then((res) => {
    console.log('Welcome to your server :D', res.data.msg);
  });

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

export default App;
