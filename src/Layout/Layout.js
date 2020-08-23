/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';

import { BankContext } from '../context/Context';
import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarGuest from './LayoutSidebarGuest';
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

  return (
    <>
      <div className="d-flex transaction-layout">
        {openDefaultCoinSidebar ? (
          <LayoutSidebarCoins active={active} />
        ) : email ? (
          <LayoutSidebar active={active} />
        ) : (
          <LayoutSidebarGuest active={active} />
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
