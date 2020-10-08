import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

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
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const onLogin = () => {
    if (onLoginPage) {
      history.push(onLoginPage);
    }
  };
  return (
    <>
      <div
        key="guest"
        className={`side-bar d-flex flex-column ${
          sidebarCollapse && 'collapse'
        }`}
      >
        <div className="profile d-flex">
          <img
            src={guest}
            alt=""
            onClick={() => setSidebarCollapse(!sidebarCollapse)}
          />
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
          <div className="toolTip">Expand Menu</div>
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
            <div className="toolTip">Index</div>
          </Link>
          <Link
            to="/moneyMarkets"
            className={`menu-itm${active === 'moneyMarkets' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={moneyMarkets} alt="" />
              <span className="my-auto">MoneyMarkets</span>
            </h5>
            <div className="toolTip">MoneyMarkets</div>
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
            <div className="toolTip">My Assets</div>
          </div>
          <div href="https://planb.assets.io/" className={`menu-itm disable`}>
            <h5 className="d-flex py-3 menu-itm">
              <img src={planB} alt="" />
              <span className="my-auto">PlanB</span>
            </h5>
            <div className="toolTip">PlanB</div>
          </div>
          <Link
            to="/options"
            className={`menu-itm${active === 'Options' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={appstore} alt="" />
              <span className="my-auto">Options</span>
            </h5>
            <div className="toolTip">Options</div>
          </Link>
          <Link
            to="/mobile-apps"
            className={`menu-itm${active === 'mobileApps' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={appstore} alt="" />
              <span className="my-auto">Mobile Apps</span>
            </h5>
            <div className="toolTip">Mobile Apps</div>
          </Link>
        </Scrollbars>

        <AssetPriceOrRates
          setSidebarCollapse={setSidebarCollapse}
          isIndex={active === 'index'}
        />
        <div
          className="logoutBtn"
          onClick={() => {
            setLoginModalOpen(true);
            setOnLoginPage(false);
          }}
        >
          <FontAwesomeIcon icon={faLock} />
        </div>
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
