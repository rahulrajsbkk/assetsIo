import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faWallet,
  faExchangeAlt,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { BankContext } from '../context/Context';

function Home() {
  const { email } = useContext(BankContext);
  if (email && email !== '') {
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
            <div className="menu-itm">
              <h5 className="d-flex py-3 menu-itm">
                <FontAwesomeIcon className="mr-4" icon={faWallet} />
                <span className="my-auto">Accounts</span>
              </h5>
            </div>
            <div className="menu-itm">
              <h5 className="d-flex py-3 menu-itm">
                <FontAwesomeIcon className="mr-4" icon={faCreditCard} />
                <span className="my-auto">Cards</span>
              </h5>
            </div>
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
        <div className="main-content">Hello</div>
        <div className="side-bar-right">Hello</div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}

export default Home;
