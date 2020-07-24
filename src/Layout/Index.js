/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  faCaretDown,
  faCaretUp,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { BankContext } from '../context/Context';

import btc from '../static/images/vault-methods/bitcoin.svg';
import eth from '../static/images/vault-methods/ethereum.svg';
import xrp from '../static/images/vault-methods/ripple.svg';
import usdt from '../static/images/vault-methods/tether.svg';

import card from '../static/images/sidebar-icons/card.svg';
import deposit from '../static/images/sidebar-icons/deposit.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import withdraw from '../static/images/sidebar-icons/withdraw.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';

function Layout({ children, active, className }) {
  const { login, email, username, name, profileImg, ratesRes } = useContext(
    BankContext
  );
  const history = useHistory();
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

  const [openSubMenu, setOpenSubMenu] = useState(false);
  if (email && email !== '') {
    return (
      <div className="d-flex transaction-layout">
        <div className="side-bar d-flex flex-column">
          <div className="profile d-flex">
            <img
              src={
                profileImg
                  ? profileImg
                  : `https://api.adorable.io/avatars/100/${username}.png`
              }
              alt=""
            />
            <div className="col my-auto">
              <h5>{name ? name : username}&nbsp;</h5>
              <h6>Platnium</h6>
            </div>
          </div>
          <div className="d-flex flex-column menu-side mt-5">
            <Link
              to="/"
              className={`menu-itm${active === 'vaults' ? ' active' : ''}`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={portfolio} alt="" />
                <span className="my-auto">Portfolio</span>
              </h5>
            </Link>
            <div
              className={`menu-itm${
                active.includes('transactions') ? ' active' : ''
              }`}
              onClick={() => {
                setOpenSubMenu(!openSubMenu);
                history.push('/transactions');
              }}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={card} alt="" />
                <span className="my-auto">Transactions</span>
                <FontAwesomeIcon
                  className="ml-auto"
                  icon={openSubMenu ? faCaretUp : faCaretDown}
                />
              </h5>
            </div>
            {openSubMenu ? (
              <div className="submenu">
                <Link
                  to="/transactions/deposit"
                  className={`menu-itm${
                    active === 'transactions-deposit' ? ' active' : ''
                  }`}
                >
                  <h5 className="d-flex py-3 menu-itm">
                    <img src={deposit} alt="" />
                    <span className="my-auto">Deposit</span>
                  </h5>
                </Link>
                <Link
                  to="/transactions/withdraw"
                  className={`menu-itm${
                    active === 'transactions-withdraw' ? ' active' : ''
                  }`}
                >
                  <h5 className="d-flex py-3 menu-itm">
                    <img src={withdraw} alt="" />
                    <span className="my-auto">Withdraw</span>
                  </h5>
                </Link>
              </div>
            ) : (
              <Link
                to="/mobile-apps"
                className={`menu-itm${
                  active === 'mobileApps' ? ' active' : ''
                }`}
              >
                <h5 className="d-flex py-3 menu-itm">
                  <img src={appstore} alt="" />
                  <span className="my-auto">Mobile Apps</span>
                </h5>
              </Link>
            )}
          </div>
          <Scrollbars
            className="rate-list-wrapper"
            renderTrackVertical={(props) => (
              <div {...props} className="d-none" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="d-none" />
            )}
            renderView={(props) => <div {...props} className="rates-list" />}
          >
            <div className="coin">
              <img className="coin-logo" src={btc} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={eth} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={usdt} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={xrp} alt="" />
              <div className="rate">
                {ratesRes[3] && ratesRes[3].tier1.rate
                  ? formatPercent(ratesRes[3].tier1.rate)
                  : '0.0'}
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={btc} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={eth} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={usdt} alt="" />
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
            </div>
            <div className="coin">
              <img className="coin-logo" src={xrp} alt="" />
              <div className="rate">
                {ratesRes[3] && ratesRes[3].tier1.rate
                  ? formatPercent(ratesRes[3].tier1.rate)
                  : '0.0'}
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
          </Scrollbars>
          <div
            onClick={() => login()}
            role="button"
            tabIndex="0"
            className="logout"
          >
            <h5>
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Logout
            </h5>
          </div>
        </div>
        <div className={`page-content ${className}`}>{children}</div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}

export default Layout;
