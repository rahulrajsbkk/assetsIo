import React from 'react';
import OptionsContextProvider from './ContextAPI/OptionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './Static/scss/master.scss';
import Home from './pages/Home/Home';

function Indices() {
  return (
    <OptionsContextProvider>
      <Home />
    </OptionsContextProvider>
  );
}

export default Indices;
