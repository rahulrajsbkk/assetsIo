import React, { useContext, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import guest from '../static/images/guest.jpg';
import iced from '../static/images/logo.svg';
import card from '../static/images/sidebar-icons/card.svg';
import portfolio from '../static/images/sidebar-icons/portfolio.svg';
import appstore from '../static/images/sidebar-icons/appstore.svg';
import { BankContext } from '../context/Context';
import AssetPriceOrRates from './AssetPriceOrRates';

function LayoutSidebar({ active }) {
  const history = useHistory();
  const {
    username,
    name,
    profileImg,
    setOpenDefaultCoinSidebar,
    openDefaultCoinSidebar,
    defaultCoin,
  } = useContext(BankContext);

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
            <h6>{defaultCoin.name}</h6>
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
          to="/index"
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
            history.push('/vault');
          }}
        >
          <h5 className="d-flex py-3 menu-itm">
            <img src={card} alt="" />
            <span className="my-auto">Vault</span>
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
        <div ref={menuEndRef} className="spacer" />
      </Scrollbars>
      <AssetPriceOrRates isIndex={active === 'index'} />
    </div>
  );
}

export default LayoutSidebar;
