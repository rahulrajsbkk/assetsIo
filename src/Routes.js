import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Vault from './pages/Vault';
import Portfolio from './pages/Portfolio';
import MobileApps from './pages/MobileApps';
import Markets from './pages/Markets';
import IcedIndex from './pages/IcedIndex';
import useWindowDimensions from './utils/WindowSize';
import IcedIndexMobile from './pages/IcedIndexMobile';

function Routes() {
  const { width } = useWindowDimensions();
  return (
    <Switch>
      <Route exact path="/portfolio" component={Portfolio} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/">
        <>{width > 768 ? <IcedIndex /> : <IcedIndexMobile />}</>
      </Route>
      <Route exact path="/vault" component={Vault} />
      <Route exact path="/vault/:type" component={Vault} />
      <Route exact path="/mobile-apps" component={MobileApps} />
      <Route exact path="/markets" component={Markets} />
    </Switch>
  );
}

export default Routes;
