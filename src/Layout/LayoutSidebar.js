import React, { useContext, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import guest from '../static/images/guest.jpg';
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
  const {
    login,
    username,
    name,
    profileImg,
    setOpenDefaultCoinSidebar,
    openDefaultCoinSidebar,
    defaultCoin,
  } = useContext(BankContext);
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
        <img src={profileImg ? profileImg : guest} alt="" />
        <div className="col my-auto">
          <h5>{name ? name : username}&nbsp;</h5>
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
        <div
          className={`menu-itm${active.includes('vaults') ? ' active' : ''}`}
          onClick={() => {
            setOpenSubMenu(!openSubMenu);
            history.push('/vault');
            setTimeout(() => {
              scrollToBottom();
            }, 100);
          }}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={card} alt="" />
            <span className="my-auto">Vault</span>
            <FontAwesomeIcon
              className="ml-auto"
              icon={openSubMenu ? faCaretUp : faCaretDown}
            />
          </h5>
        </div>
        {openSubMenu ? (
          <>
            <Link
              to="/vault/deposit"
              className={`menu-itm submenu${
                active === 'vaults-deposit' ? ' active' : ''
              }`}
            >
              <h5 className="d-flex py-3 menu-itm">
                <img src={deposit} alt="" />
                <span className="my-auto">Deposit</span>
              </h5>
            </Link>
            <Link
              to="/vault/withdraw"
              className={`menu-itm submenu${
                active === 'vaults-withdraw' ? ' active' : ''
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
      <AssetPriceOrRates isIndex={active === 'index'} />
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
