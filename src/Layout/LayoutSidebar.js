import React, { useContext, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import iced from '../static/images/logo.svg';
import card from '../static/images/sidebar-icons/card.svg';
import deposit from '../static/images/sidebar-icons/deposit.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import withdraw from '../static/images/sidebar-icons/withdraw.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import { BankContext } from '../context/Context';
import AssetPriceOrRates from './AssetPriceOrRates';

function LayoutSidebar({ active, countryName }) {
  const history = useHistory();
  const { login, username, name, profileImg } = useContext(BankContext);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const menuEndRef = useRef(null);

  const scrollToBottom = () => {
    if (menuEndRef && menuEndRef.current)
      menuEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (active.includes('transactions')) {
      scrollToBottom();
    }
  }, [active]);

  return (
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
          <h6>{countryName}</h6>
        </div>
      </div>
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
          className={`menu-itm${active === 'icedIndex' ? ' active' : ''}`}
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
        <div
          className={`menu-itm${
            active.includes('transactions') ? ' active' : ''
          }`}
          onClick={() => {
            setOpenSubMenu(!openSubMenu);
            history.push('/transactions');
            setTimeout(() => {
              scrollToBottom();
            }, 100);
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
          <>
            <Link
              to="/transactions/deposit"
              className={`menu-itm submenu${
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
              className={`menu-itm submenu${
                active === 'transactions-withdraw' ? ' active' : ''
              }`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={withdraw} alt="" />
                <span className="my-auto">Withdraw</span>
              </h5>
            </Link>
          </>
        ) : (
          <Link
            to="/mobile-apps"
            className={`menu-itm${active === 'mobileApps' ? ' active' : ''}`}
          >
            <h5 className="d-flex py-3 menu-itm">
              <img src={appstore} alt="" />
              <span className="my-auto">Mobile Apps</span>
            </h5>
          </Link>
        )}
        <div ref={menuEndRef} className="spacer" />
      </Scrollbars>
      <AssetPriceOrRates />
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
  );
}

export default LayoutSidebar;
