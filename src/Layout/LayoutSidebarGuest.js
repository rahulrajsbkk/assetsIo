import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import allPlatforms from '../static/images/world.png';
import iced from '../static/images/logo.svg';
import guest from '../static/images/guest.jpg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import AssetPriceOrRates from './AssetPriceOrRates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../context/Context';

function LayoutSidebarGuest({ active }) {
  const {
    openDefaultCoinSidebar,
    setOpenDefaultCoinSidebar,
    defaultCoin,
  } = useContext(BankContext);
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
            <h5>Guest&nbsp;</h5>
            <div
              className="currencySelect"
              onClick={() => setOpenDefaultCoinSidebar(!openDefaultCoinSidebar)}
            >
              <img src={defaultCoin.img} alt="" />
              <h6>
                {defaultCoin.name}
                <FontAwesomeIcon icon={faCaretDown} />
              </h6>
            </div>
          </div>
        </div>
        <Scrollbars
          className="mt-4 menu-scrl"
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
              <span className="my-auto">Iced Index</span>
            </h5>
          </Link>
          <div
            onClick={() => {
              setLoginModalOpen(true);
              setOnLoginPage('/portfolio');
            }}
            className={`menu-itm${active === 'portfolio' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={portfolio} alt="" />
              <span className="my-auto">Portfolio</span>
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
        <div
          onClick={() => {
            setLoginModalOpen(true);
          }}
          role="button"
          tabIndex="0"
          className="logout"
        >
          <h5>Get Started</h5>
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
