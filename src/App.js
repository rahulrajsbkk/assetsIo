import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import BankContextProvider from './context/Context';

const App = () => (
  <BankContextProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </BankContextProvider>
);

export default App;
