import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';

const App = () => {
  useEffect(() => {
    toast.configure();
    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
