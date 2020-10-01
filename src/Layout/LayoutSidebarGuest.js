import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import iced from '../static/images/logo.svg';
import guest from '../static/images/logoWtBg.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import moneyMarkets from '../static/images/sidebar-icons/moneyMarkets.svg';
import planB from '../static/images/sidebar-icons/planB.svg';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import AssetPriceOrRates from './AssetPriceOrRates';

function LayoutSidebarGuest({ active }) {
  const history = useHistory();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [onLoginPage, setOnLoginPage] = useState('');
  const onLogin = () => {
    if (onLoginPage) {
      history.push(onLoginPage);
    }
  };
  return (
    <>
      <div key="guest" className="side-bar d-flex flex-column">
        <div className="profile d-flex">
          <img src={guest} alt="" />
          <div className="col my-auto">
            <h5>Assets.io&nbsp;</h5>
            <div
              className="getStartedBtn"
              onClick={() => {
                setLoginModalOpen(true);
                setOnLoginPage(false);
              }}
            >
              Get Started
            </div>
          </div>
        </div>
        <Scrollbars
          className="menu-scrl"
          autoHide
          renderTrackHorizontal={() => <div />}
          renderThumbHorizontal={() => <div />}
          renderView={(props) => <div {...props} className="menu-side" />}
        >
          <Link
            to="/"
            className={`menu-itm${active === 'index' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={iced} alt="" />
              <span className="my-auto">Index</span>
            </h5>
          </Link>
          <Link
            to="/moneyMarkets"
            className={`menu-itm${active === 'moneyMarkets' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={moneyMarkets} alt="" />
              <span className="my-auto">MoneyMarkets</span>
            </h5>
          </Link>
          <div
            onClick={() => {
              setLoginModalOpen(true);
              setOnLoginPage('/');
            }}
            className={`menu-itm${active === 'portfolio' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={portfolio} alt="" />
              <span className="my-auto">My Net-Worth</span>
            </h5>
          </div>
          <div href="https://planb.assets.io/" className={`menu-itm disable`}>
            <h5 className="d-flex py-3 menu-itm">
              <img src={planB} alt="" />
              <span className="my-auto">PlanB</span>
            </h5>
          </div>
          <Link
            to="/mobile-apps"
            className={`menu-itm${active === 'mobileApps' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={appstore} alt="" />
              <span className="my-auto">Mobile Apps</span>
            </h5>
          </Link>
        </Scrollbars>

        <AssetPriceOrRates isIndex={active === 'index'} />
      </div>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
            setOnLoginPage();
          }}
          onLogin={onLogin}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default LayoutSidebarGuest;
