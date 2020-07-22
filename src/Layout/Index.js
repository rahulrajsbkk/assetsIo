/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
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

function Layout({ children, active, className }) {
  const { login, email, username, name, profileImg } = useContext(BankContext);
  const history = useHistory();
  const arrow = (
    <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
        fill="#3EA154"
      />
    </svg>
  );
  const [openSubMenu, setOpenSubMenu] = useState(false);
  if (email && email !== '') {
    return (
      <div className="d-flex home-layout">
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
            <div className="col py-3">
              <h5>
                {name ? name : username}&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </h5>
              <h6>Platnium</h6>
            </div>
          </div>
          <div className="d-flex flex-column menu-side my-5 mx-3">
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
                history.push('/transactions/deposit');
              }}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={card} alt="" />
                <span className="my-auto">Transactions</span>
                <FontAwesomeIcon className="ml-auto" icon={faCaretDown} />
              </h5>
            </div>
            {openSubMenu || active.includes('transactions') ? (
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
              ''
            )}
          </div>
          <div className="flex-grow-1 d-flex flex-column position-relative">
            <div className="rates-list">
              <div className="coin">
                <img className="coin-logo" src={btc} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={eth} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={xrp} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={usdt} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={btc} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={eth} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={xrp} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
              <div className="coin">
                <img className="coin-logo" src={usdt} alt="" />
                <div className="rate">
                  12.3%
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => login()}
            role="button"
            tabIndex="0"
            className="logout"
          >
            <h5>Logout</h5>
          </div>
        </div>
        <div className={`page-content ${className}`}>{children}</div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}

export default Layout;
