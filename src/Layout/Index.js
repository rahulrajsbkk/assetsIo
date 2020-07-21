import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faWallet,
  faExchangeAlt,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import btc from '../static/images/vault-methods/bitcoin.svg';
import eth from '../static/images/vault-methods/ethereum.svg';
import xrp from '../static/images/vault-methods/ripple.svg';
import usdt from '../static/images/vault-methods/tether.svg';

function Layout({ children, active, className }) {
  return (
    <div className="d-flex home-layout">
      <div className="side-bar d-flex flex-column">
        <div className="profile d-flex">
          <img
            src="https://optionsdocuments.blob.core.windows.net/documents/user-image-b939ba6b-c66d-4e15-8dd4-cc36cfdbd05e.png"
            alt=""
          />
          <div className="col py-3">
            <h5>
              John Fernandaz &nbsp;
              <FontAwesomeIcon icon={faCaretDown} />
            </h5>
            <h6>Admin</h6>
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-1 menu-side my-5 mx-3">
          <Link
            to="/"
            className={`menu-itm${active === 'accounts' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <FontAwesomeIcon className="mr-4" icon={faWallet} />
              <span className="my-auto">Accounts</span>
            </h5>
          </Link>
          <Link
            to="/vaults"
            className={`menu-itm${active === 'vaults' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <FontAwesomeIcon className="mr-4" icon={faCreditCard} />
              <span className="my-auto">Vaults</span>
            </h5>
          </Link>
          <div className="menu-itm">
            <h5 className="d-flex py-3 menu-itm">
              <FontAwesomeIcon className="mr-4" icon={faExchangeAlt} />
              <span className="my-auto">Payments</span>
            </h5>
          </div>
        </div>
        <div className="rates-list">
          <div className="coin">
            <img className="coin-logo" src={btc} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={eth} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={xrp} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={usdt} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={btc} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={eth} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={xrp} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
          <div className="coin">
            <img className="coin-logo" src={usdt} alt="" />
            <div className="rate">
              12.3%
              <small>
                (1.2%)
                <svg
                  viewBox="0 0 9 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
                    fill="#3EA154"
                  />
                </svg>
              </small>
            </div>
          </div>
        </div>
        <div className="logout">
          <h5>Logout</h5>
        </div>
      </div>
      <div className={`page-content ${className}`}>{children}</div>
    </div>
  );
}

export default Layout;
