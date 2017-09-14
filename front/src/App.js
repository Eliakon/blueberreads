import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home';
import Post from './Post';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/post/:id-:slug" component={Post} />
      <Route path="/post/:id" component={Post} />
    </Switch>
  </Router>
);

export default App;
