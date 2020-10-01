import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Vault from './pages/Vault';
import Portfolio from './pages/Portfolio';
import MobileApps from './pages/MobileApps';
import Markets from './pages/Markets';
import IcedIndex from './pages/IcedIndex';
import { BankContext } from './context/Context';
import Earnings from './pages/Earnings';
import NetWorthPage from './pages/NetWorthPage';
import IceMechineMobile from './pages/IceMechineMobile';
import MoneyMarkets from './pages/MoneyMarkets';
import BondOverview from './pages/BondOverview';

function Routes({ match }) {
  const { email } = useContext(BankContext);
  return (
    <Switch>
      <Route exact path="/iceAsset" component={Portfolio} />
      <Route exact path="/iceAssetMobile/:coin" component={IceMechineMobile} />
      <Route exact path="/net-worth" component={NetWorthPage} />
      <Route
        exact
        path="/net-worth/:assetClass/:assetCoin/:liquidity"
        component={NetWorthPage}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/index">
        <IcedIndex />
      </Route>
      <Route exact path="/bonds">
        <IcedIndex activeTab={'bonds'} />
      </Route>
      <Route exact path="/globalPayments">
        <IcedIndex activeTab={'globalPayments'} />
      </Route>
      <Route exact path="/">
        <>{email ? <NetWorthPage /> : <IcedIndex />}</>
      </Route>
      <Route exact path="/vault" component={Vault} />
      <Route exact path="/earning" component={Earnings} />
      <Route exact path="/vault/:type" component={Vault} />
      <Route exact path="/mobile-apps" component={MobileApps} />
      <Route exact path="/markets" component={Markets} />
      <Route exact path="/moneyMarkets" component={MoneyMarkets} />
      <Route exact path="/bonds/:id" component={BondOverview} />
    </Switch>
  );
}

export default Routes;
