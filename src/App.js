import React from 'react';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import BankContextProvider from './context/Context';
import PortfolioContextProvider from './context/PortfolioContext';
import NetWorthContextProvider from './context/ NetWorthContext';

const App = () => (
  <BankContextProvider>
    <PortfolioContextProvider>
      <NetWorthContextProvider>
        <HashRouter>
          <Routes />
        </HashRouter>
      </NetWorthContextProvider>
    </PortfolioContextProvider>
  </BankContextProvider>
);

export default App;
