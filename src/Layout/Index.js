import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faWallet,
  faExchangeAlt,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Layout({ children, active, className }) {
  return (
    <div className="d-flex home-page">
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
        <div className="last-seen-card card p-4">
          <h6>Last Connection</h6>
          <h4>Tue,July 21st 20:48</h4>
        </div>
      </div>
      <div className={`page-content ${className}`}>{children}</div>
    </div>
  );
}

export default Layout;
