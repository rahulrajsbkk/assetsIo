/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';

import { BankContext } from '../context/Context';
import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarGuest from './LayoutSidebarGuest';
import Axios from 'axios';

function Layout({ children, active, className }) {
  const { email } = useContext(BankContext);
  const [countryName, setCountryName] = useState('');
  useEffect(() => {
    Axios.get('https://ipapi.co/country_name/')
      .then((response) => {
        let data = response.data;
        setCountryName(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="d-flex transaction-layout">
      {email ? (
        <LayoutSidebar countryName={countryName} active={active} />
      ) : (
        <LayoutSidebarGuest countryName={countryName} active={active} />
      )}
      <div className={`page-content ${className}`}>{children}</div>
    </div>
  );
}

export default Layout;
