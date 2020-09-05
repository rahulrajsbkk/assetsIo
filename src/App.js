import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import BankContextProvider from './context/Context';
import PortfolioContextProvider from './context/PortfolioContext';

const App = () => (
  <BankContextProvider>
    <PortfolioContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PortfolioContextProvider>
  </BankContextProvider>
);

export default App;
