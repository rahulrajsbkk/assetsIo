import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Transaction from './pages/Transaction';
import Vaults from './pages/Vaults';
import MobileApps from './pages/MobileApps';
import Markets from './pages/Markets';
import IcedIndex from './pages/IcedIndex';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Vaults} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/iced-index" component={IcedIndex} />
      <Route exact path="/transactions" component={Transaction} />
      <Route exact path="/transactions/:type" component={Transaction} />
      <Route exact path="/mobile-apps" component={MobileApps} />
      <Route exact path="/markets" component={Markets} />
    </Switch>
  );
}

export default Routes;
