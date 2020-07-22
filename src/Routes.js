import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Vaults from './pages/Vaults';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Vaults} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/transactions/:type" component={Home} />
    </Switch>
  );
}

export default Routes;
