import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Routes from './Routes';
import BankContextProvider from './context/Context';

const App = () => {
  useEffect(() => {
    toast.configure();
    return () => {};
  }, []);

  return (
    <BankContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </BankContextProvider>
  );
};

export default App;
