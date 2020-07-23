import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Vaults from './pages/Vaults';
import MobileApps from './pages/MobileApps';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Vaults} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/transactions" component={Home} />
      <Route exact path="/transactions/:type" component={Home} />
      <Route exact path="/mobile-apps" component={MobileApps} />
    </Switch>
  );
}

export default Routes;
