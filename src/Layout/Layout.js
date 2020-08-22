/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';

import { BankContext } from '../context/Context';
import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarGuest from './LayoutSidebarGuest';
import Axios from 'axios';
import LayoutSidebarCoins from './LayoutSidebarCoins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginWrapper from '../components/LoginModal/LoginWrapper';

function Layout({ children, active, className }) {
  const {
    email,
    openDefaultCoinSidebar,
    footerShow,
    setFooterShow,
  } = useContext(BankContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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
    <>
      <div className="d-flex transaction-layout">
        {openDefaultCoinSidebar ? (
          <LayoutSidebarCoins />
        ) : email ? (
          <LayoutSidebar countryName={countryName} active={active} />
        ) : (
          <LayoutSidebarGuest countryName={countryName} active={active} />
        )}
        <div className={`page-content ${className}`}>{children}</div>
      </div>
      {!email && footerShow ? (
        <footer className="footer-main">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setFooterShow(false)}
          />
          <div className="text">
            Grow Your Crypto Porfolio By Turning Your Your Coins Into Fixed
            Income Assets.
          </div>
          <div
            className="btnGetStarted"
            onClick={() => {
              setLoginModalOpen(true);
            }}
          >
            Get Started For Free
          </div>
        </footer>
      ) : (
        ''
      )}
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onLogin={() => {
            setLoginModalOpen(false);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Layout;
