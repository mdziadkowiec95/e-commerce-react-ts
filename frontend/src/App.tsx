import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ContentfulService from './services/ContentfulService';
import Products from './views/Products';
import axios from 'axios';

function App() {
  // Test contentful communication
  ContentfulService.getCategories().then(res => {
    res.items.forEach(el => {
      console.log(el.fields.fieldName);
    });
    console.log(res);
  });

  // Test server communication
  axios.get('/api').then(res => {
    console.log('Welcome to your server :D', res.data.msg);
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={()=>{ return <h1>Home</h1>}} />
          <Route exact path="/products/:rootCategory?/:subCategory?" component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
