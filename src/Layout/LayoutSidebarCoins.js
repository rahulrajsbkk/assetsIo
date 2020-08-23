import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';

import settingsIcon from '../static/images/sidebar-icons/settings.svg';
import guest from '../static/images/logoWtBg.png';
import card from '../static/images/sidebar-icons/card.svg';
import iced from '../static/images/logo.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import allPlatforms from '../static/images/allPlatforms.svg';
import { BankContext } from '../context/Context';
import LoginWrapper from '../components/LoginModal/LoginWrapper';
import { Link, useHistory } from 'react-router-dom';
import SidebarSettings from './SidebarSettings';

function LayoutSidebarCoins({ active }) {
  const {
    email,
    username,
    name,
    profileImg,
    coinList,
    defaultCoin,
    setDefaultCoin,
    setOpenDefaultCoinSidebar,
    openDefaultCoinSidebar,
  } = useContext(BankContext);
  const history = useHistory();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [coinListSorted, setCoinListSorted] = useState(coinList);
  const [onLoginPage, setOnLoginPage] = useState('');
  const [tabItem, setTabItem] = useState('Interest Rates');

  const onLogin = () => {
    if (onLoginPage) {
      history.push(onLoginPage);
    } else {
      setLoginModalOpen(false);
    }
  };

  useEffect(() => {
    if (coinList) {
      const coinsOrder = ['USD', 'CAD', 'GBP', 'INR', 'EUR'];
      const arr = coinList;
      const sortedArr = [];
      coinsOrder.forEach((symbol) => {
        let index;
        arr.forEach((coin, i) => {
          console.log('coin.coinSymbol', coin.coinSymbol);
          if (coin.coinSymbol === symbol) index = i;
        });
        sortedArr.push(...arr.splice(index, 1));
        setCoinListSorted(sortedArr.concat(arr));
      });
    }
  }, [coinList]);
  return (
    <>
      <div className="side-bar d-flex flex-column">
        <div className="profile d-flex">
          <img src={profileImg ? profileImg : guest} alt="" />
          <div className="col my-auto">
            <h5>{email ? (name ? name : username) : 'Guest'}&nbsp;</h5>
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
        {email ? (
          <Scrollbars
            className="mt-4 menu-scrl"
            autoHide
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            renderView={(props) => <div {...props} className="menu-side" />}
          >
            <div className="spacer" />
            <Link
              to="/"
              className={`menu-itm${active === 'index' ? ' active' : ''}`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={iced} alt="" />
                <span className="my-auto">Iced Index</span>
              </h5>
            </Link>
            <Link
              to="/portfolio"
              className={`menu-itm${active === 'portfolio' ? ' active' : ''}`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={portfolio} alt="" />
                <span className="my-auto">Portfolio</span>
              </h5>
            </Link>
            <Link
              to="/vault"
              className={`menu-itm${
                active.includes('vaults') ? ' active' : ''
              }`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={card} alt="" />
                <span className="my-auto">Vault</span>
              </h5>
            </Link>
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
        ) : (
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
                <span className="my-auto">Iced Vault</span>
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
        )}
        {tabItem === 'Settings' ? (
          <SidebarSettings
            tabItem={tabItem}
            setTabItem={setTabItem}
            defTab={
              <div
                className={`tab-itm order-1 ${tabItem === 'Interest Rates'}`}
                onClick={() => setTabItem('Interest Rates')}
              >
                Set New Display Currency
              </div>
            }
          />
        ) : (
          <>
            <div className="tab-inrest-asset">
              <div
                className={`tab-itm order-1 ${tabItem === 'Interest Rates'}`}
                onClick={() => setTabItem('Interest Rates')}
              >
                Set New Display Currency
              </div>
              <div
                className={`tab-itm settings order-3 ${tabItem === 'Settings'}`}
                onClick={() => setTabItem('Settings')}
              >
                <img src={settingsIcon} alt="" />
              </div>
            </div>
            <Scrollbars
              autoHide
              renderThumbHorizontal={() => <div />}
              renderView={(props) => <div {...props} className="coins-list" />}
              className="defCoinList"
            >
              <div
                className="coin"
                key="all"
                onClick={() => {
                  setDefaultCoin({
                    coin: null,
                    name: 'Default Coin',
                    img: allPlatforms,
                  });
                  setOpenDefaultCoinSidebar(false);
                }}
              >
                <img className="coin-logo mr-2" src={allPlatforms} alt="" />
                <div className="coin-name">Default Currency</div>
              </div>
              {coinListSorted.map((coin) => (
                <div
                  className="coin"
                  key={coin.coinName}
                  onClick={() => {
                    setDefaultCoin({
                      coin: coin.coinSymbol,
                      name: coin.coinName,
                      img: coin.coinImage,
                    });
                    setOpenDefaultCoinSidebar(false);
                  }}
                >
                  <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
                  <div className="coin-name">{coin.coinName}</div>
                </div>
              ))}
            </Scrollbars>
          </>
        )}
      </div>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onLogin={onLogin}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default LayoutSidebarCoins;
