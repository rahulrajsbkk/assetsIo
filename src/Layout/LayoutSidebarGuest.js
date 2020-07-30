import React, { useContext, useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, useHistory } from 'react-router-dom';

import btc from '../static/images/vault-methods/bitcoin.svg';
import eth from '../static/images/vault-methods/ethereum.svg';
import xrp from '../static/images/vault-methods/ripple.svg';
import usdt from '../static/images/vault-methods/tether.svg';

import iced from '../static/images/logo.svg';
import guest from '../static/images/guest.jpg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import { BankContext } from '../context/Context';
import LoginWrapper from '../components/LoginModal/LoginWrapper';

function LayoutSidebarGuest({ active, countryName }) {
  const history = useHistory();
  const { ratesRes, coinList } = useContext(BankContext);
  const [coinListObj, setCoinListObj] = useState({});

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [onLoginPage, setOnLoginPage] = useState('');

  const onLogin = () => {
    if (onLoginPage) {
      history.push(onLoginPage);
    }
  };

  useEffect(() => {
    let obj = {};
    coinList.forEach((coin) => {
      obj[coin.coinSymbol] = coin;
    });
    setCoinListObj(obj);
  }, [coinList]);

  const arrow = (
    <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
        fill="#3EA154"
      />
    </svg>
  );

  const formatPercent = (num) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }).format(num);
  const formatNum = (num, prec) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: prec,
      minimumFractionDigits: prec,
    }).format(num);

  const [tabItem, setTabItem] = useState('Interest Rates');

  return (
    <>
      <div className="side-bar d-flex flex-column">
        <div className="profile d-flex">
          <img src={guest} alt="" />
          <div className="col my-auto">
            <h5>Guest&nbsp;</h5>
            <h6>{countryName}</h6>
          </div>
        </div>
        <div className="d-flex flex-column menu-side mt-2">
          <Link
            to="/"
            className={`menu-itm${active === 'icedIndex' ? ' active' : ''}`}
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
        </div>
        <div className="tab-inrest-asset">
          <div
            className={`tab-itm ${tabItem === 'Interest Rates'}`}
            onClick={() => setTabItem('Interest Rates')}
          >
            Interest Rates
          </div>
          <div
            className={`tab-itm ${tabItem === 'Asset Prices'}`}
            onClick={() => setTabItem('Asset Prices')}
          >
            Asset Prices
          </div>
        </div>
        <Scrollbars
          className="rate-list-wrapper"
          renderTrackVertical={(props) => <div {...props} className="d-none" />}
          renderThumbVertical={(props) => <div {...props} className="d-none" />}
          renderView={(props) => <div {...props} className="rates-list" />}
        >
          <div className="coin">
            <img className="coin-logo" src={btc} alt="" />
            {tabItem === 'Interest Rates' ? (
              <div className="rate">
                {ratesRes[0] && ratesRes[0].tier1.rate
                  ? formatPercent(ratesRes[0].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            ) : (
              <div className="rate">
                {formatNum(
                  coinListObj &&
                    coinListObj.BTC &&
                    coinListObj.BTC.price &&
                    coinListObj.BTC.price.USD,
                  2
                )}
                $
                <small>
                  (
                  {formatNum(
                    coinListObj &&
                      coinListObj.BTC &&
                      coinListObj.BTC.price &&
                      coinListObj.BTC._24hrchange,
                    2
                  )}
                  %)
                </small>
              </div>
            )}
          </div>
          <div className="coin">
            <img className="coin-logo" src={eth} alt="" />
            {tabItem === 'Interest Rates' ? (
              <div className="rate">
                {ratesRes[1] && ratesRes[1].tier1.rate
                  ? formatPercent(ratesRes[1].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            ) : (
              <div className="rate">
                {formatNum(
                  coinListObj &&
                    coinListObj.ETH &&
                    coinListObj.ETH.price &&
                    coinListObj.ETH.price.USD,
                  2
                )}
                $
                <small>
                  (
                  {formatNum(
                    coinListObj &&
                      coinListObj.ETH &&
                      coinListObj.ETH.price &&
                      coinListObj.ETH._24hrchange,
                    2
                  )}
                  %)
                </small>
              </div>
            )}
          </div>
          <div className="coin">
            <img className="coin-logo" src={usdt} alt="" />
            {tabItem === 'Interest Rates' ? (
              <div className="rate">
                {ratesRes[2] && ratesRes[2].tier1.rate
                  ? formatPercent(ratesRes[2].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            ) : (
              <div className="rate">
                {formatNum(
                  coinListObj &&
                    coinListObj.USDT &&
                    coinListObj.USDT.price &&
                    coinListObj.USDT.price.USD,
                  2
                )}
                $
                <small>
                  (
                  {formatNum(
                    coinListObj &&
                      coinListObj.USDT &&
                      coinListObj.USDT.price &&
                      coinListObj.USDT._24hrchange,
                    2
                  )}
                  %)
                </small>
              </div>
            )}
          </div>
          <div className="coin">
            <img className="coin-logo" src={xrp} alt="" />
            {tabItem === 'Interest Rates' ? (
              <div className="rate">
                {ratesRes[3] && ratesRes[3].tier1.rate
                  ? formatPercent(ratesRes[3].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            ) : (
              <div className="rate">
                {formatNum(
                  coinListObj &&
                    coinListObj.XRP &&
                    coinListObj.XRP.price &&
                    coinListObj.XRP.price.USD,
                  2
                )}
                $
                <small>
                  (
                  {formatNum(
                    coinListObj &&
                      coinListObj.XRP &&
                      coinListObj.XRP.price &&
                      coinListObj.XRP._24hrchange,
                    2
                  )}
                  %)
                </small>
              </div>
            )}
          </div>
        </Scrollbars>
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
